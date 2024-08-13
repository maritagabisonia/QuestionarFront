import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { Question } from '../../Models/Question';
import { QuestionsService } from '../../Services/questions.service';

@Component({
  selector: 'app-question-form',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule,InputTextModule,ToggleButtonModule],
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.css'
})
export class QuestionFormComponent {
  addQuestionForm:FormGroup;
  newQuestion :Question = new Question();


  constructor(private fb: FormBuilder, public questionsService : QuestionsService){
    this.addQuestionForm = this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
      important: [true, Validators.required]
  });
  }
  addQuestion(): void {
    Object.assign(this.newQuestion, this.addQuestionForm.value);
    console.log(this.addQuestionForm.value)
    console.log(this.newQuestion)
    this.questionsService.add_question_ret_list(this.newQuestion).subscribe({
      next: res =>{
        this.questionsService.QuestionsList = res;
        console.log(this.questionsService.QuestionsList)

      },
      error: err => {
        console.error('Error durring adding new question:', err);
      }
    })
  }
}
