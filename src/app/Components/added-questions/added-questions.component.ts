import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuestionsService } from '../../Services/questions.service';
import { NgFor } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { QuestionDTO } from '../../Models/QuestionDTO';
import { AnswerForJSONmodel, QuestionJSONmodel } from '../../Models/QuestionForJSONmodel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-added-questions',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, ButtonModule, InputTextModule, ToggleButtonModule],
  templateUrl: './added-questions.component.html',
  styleUrls: ['./added-questions.component.css']
})
export class AddedQuestionsComponent implements OnInit {
  @Input() question!: QuestionJSONmodel;
  @Input() selectedSubject: any;

  questionsForm: FormGroup;
  id:number = 0;
  quiz:any;



  constructor(private fb: FormBuilder, private questionService: QuestionsService) {
    this.questionsForm = this.fb.group({
      questions: this.fb.array([])
    });
  }

  
  ngOnInit(): void {
    
    this.readQuestions(0);
   
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['question'] && changes['question'].currentValue) {
      this.quiz.push(this.question);
      this.readQuestions(0);
    }
    if (changes['selectedSubject']  ) {
      if(this.selectedSubject !== undefined && this.selectedSubject !== null){
        this.readQuestions(this.selectedSubject);
        console.log('Selected subject changeddddddd:', this.selectedSubject);

      }
      if(this.selectedSubject === null){
        this.readQuestions(0);
        console.log('Selected subject changeddddddddddddddddddddd:', this.selectedSubject);

      }
    }
  }

 


  readQuestions(id:number){ 
    this.questionService.readQuestions(id).subscribe({
    next: (questions: QuestionDTO[]) => {
      this.questionService.quiz = questions;   
      this.quiz =     this.questionService.quiz 

      const questionFGs = this.quiz.map((question: { id: any; question: any; important: any; numberOfAnswers: any; answers: any[]; }) => this.fb.group({
        id: [question.id],
        question: [question.question, Validators.required],
        important: [question.important],
        numberOfAnswers: [question.numberOfAnswers],
        answers: this.fb.array(question.answers.map((answer: { answer: any; correct: any; }) => this.fb.group({
          // id: [answer.id],
          answer: [answer.answer, Validators.required],
          correct: [answer.correct]
        })))
      }));
      const questionFormArray = this.fb.array(questionFGs);
      this.questionsForm.setControl('questions', questionFormArray);
    }
  });}

  get questionsFormArray(): FormArray {
    return this.questionsForm.get('questions') as FormArray;
  }

  getAnswersFormArray(index: number): FormArray {
    return this.questionsFormArray.at(index).get('answers') as FormArray;
  }

  addAnswer(index: number): void {
    const answersArray = this.getAnswersFormArray(index);
    const newAnswerGroup = this.fb.group({
      id: [null], // or an empty string or undefined, depending on your needs
      answer: ['', Validators.required],
      correct: [false]
    });
    answersArray.push(newAnswerGroup);
  }

  update(index: number): void {
    const updatedQuestionDTO: QuestionDTO = this.questionsFormArray.at(index).value;
    this.id = updatedQuestionDTO.id;
    
    const updatedQuestionJSON: QuestionJSONmodel = new QuestionJSONmodel(
      updatedQuestionDTO.question,
      updatedQuestionDTO.answers.length,
      updatedQuestionDTO.important,
      updatedQuestionDTO.answers.map(answerDTO => new AnswerForJSONmodel(
        answerDTO.answer,
        answerDTO.correct
      )),
    );
  
    console.log(updatedQuestionJSON, this.id);
    
    this.questionService.updatequestion(this.id, [updatedQuestionJSON]).subscribe(data => {
      // this.questionService.questions =data
      console.log(data);
    });
  }
}
