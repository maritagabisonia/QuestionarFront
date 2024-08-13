import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionsService } from '../../Services/questions.service';
import { NgFor } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { GetQuestion } from '../../Models/Question';

@Component({
  selector: 'app-questions-list',
  standalone: true,
  imports: [NgFor,
     ReactiveFormsModule,ButtonModule,InputTextModule,ToggleButtonModule],
  templateUrl: './questions-list.component.html',
  styleUrl: './questions-list.component.css'

})
export class QuestionsListComponent {
  questionsForm: FormGroup;

  constructor( private fb: FormBuilder, private questionService: QuestionsService) {
    this.questionsForm = this.fb.group({
      questions: this.fb.array([])
    });
  }
ngOnInit(): void {
    this.questionService.getQuestions().subscribe( {
      next: questions => {
        
      const questionFGs = questions.map(question => this.fb.group({
        id: question.id,
        question: question.question,
        answer: question.answer,
        important: question.important
      }));
      const questionFormArray = this.fb.array(questionFGs);
      this.questionsForm.setControl('questions', questionFormArray);
      }
    });

  }
  get questionsFormArray(): FormArray {
    return this.questionsForm.get('questions') as FormArray;
  }
  update(index: number){
    const updatedQuestion: GetQuestion = this.questionsFormArray.at(index).value;
    console.log(updatedQuestion)
    this.questionService.updateQuestion(updatedQuestion).subscribe( {
      next: res => {
        console.log(res)
      }
    });
  }
  


}
