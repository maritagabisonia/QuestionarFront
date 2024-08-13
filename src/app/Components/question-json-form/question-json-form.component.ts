import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { QuestionsService } from '../../Services/questions.service';
import { AnswerForJSONmodel, QuestionJSONmodel } from '../../Models/QuestionForJSONmodel';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-question-json-form',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, InputTextModule, ToggleButtonModule,NgFor],
  templateUrl: './question-json-form.component.html',
  styleUrl: './question-json-form.component.css'
})
export class QuestionJsonFormComponent {
  @Input() selectedSubject: any;
  @Output() questionAdded = new EventEmitter<QuestionJSONmodel>();

  addQuestionForm: FormGroup;

  constructor(private fb: FormBuilder, public questionsService: QuestionsService) {
    this.addQuestionForm = this.fb.group({
      question: ['', Validators.required],
      important: [true, Validators.required],
      answers: this.fb.array([this.createAnswer()])
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedSubject']) {
      console.log('Selected subject changeddddddd:', this.selectedSubject);
    }
  }

  get answers(): FormArray {
    return this.addQuestionForm.get('answers') as FormArray;
  }

  createAnswer(): FormGroup {
    return this.fb.group({
      answer: ['', Validators.required],
      correct: [false, Validators.required]
    });
  }

  addAnswer(): void {
    this.answers.push(this.createAnswer());
  }

  onSubmit(): void {
    if (this.addQuestionForm.valid) {
      const formValue = this.addQuestionForm.value;
      const newQuestion = new QuestionJSONmodel(
        formValue.question,
        formValue.answers.length,
        formValue.important,
        formValue.answers.map((a: any) => new AnswerForJSONmodel(a.answer, a.correct)),
        this.selectedSubject
      );


      this.questionsService.addQustionWithJSON([newQuestion]).subscribe({
        next: res => {
          // this.questionsService.quiz = res;
          console.log('wok',res);
          this.questionAdded.emit(newQuestion);
        },
        error: err => {
          console.error('Error during adding new question:', err);
        }
      });
    }
  }
}
