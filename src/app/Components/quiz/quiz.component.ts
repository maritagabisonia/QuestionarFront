import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Question } from '../../Models/Question';
import { Answer } from '../../Models/Answer';
import { QuestionsService } from '../../Services/questions.service';
import { UserForm } from '../../Models/UserForm ';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ConfirmDialogModule,ToastModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class QuizComponent implements OnInit {
  quizForm: FormGroup;
  questionsList: Question[] = [];
  submitted = false;


  constructor(private confirmationService: ConfirmationService, private messageService: MessageService,private fb: FormBuilder, public questionsService: QuestionsService) {
    this.quizForm = this.fb.group({
      fullname: ['', Validators.required],
      questions: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.questionsService.getQuestions().subscribe(data => {
      this.questionsList = data;
      this.populateQuestions();
    });
  }

  createQuestion(questionText: string = ''): FormGroup {
    return this.fb.group({
      question: [questionText, Validators.required],
      answer: ['', Validators.required],
      important: [true]
    });
  }

  populateQuestions() {
    const questionsArray = this.quizForm.get('questions') as FormArray;
    this.questionsList.forEach(q => {
      questionsArray.push(this.createQuestion(q.question));
    });
  }

  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  addQuestion() {
    this.questions.push(this.createQuestion());
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  onSubmit() {
    this.submitted = true;
    if (this.quizForm.invalid) {
      this.quizForm.markAllAsTouched(); // Mark all fields as touched to trigger validation messages
      return;
    }
    if (this.quizForm.valid) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to submit the form?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const formValue = this.quizForm.value;
          const userForm = new UserForm(formValue.fullname, formValue.questions.map((q: any) => new Answer(q.answer, q.question)));
          console.log(userForm)
          this.questionsService.parseJsonAnswers([userForm]).subscribe(
            res => {
              console.log('Submission successful', res);
            },
            err => {
              console.error('Submission error', err);
            }
          );
          this.messageService.add({severity:'info', summary: 'Confirmed', detail: 'Form Submitted'});
        },
        reject: () => {
          this.messageService.add({severity:'info', summary: 'Rejected', detail: 'You have rejected'});
        }
      });
    }
    
  }
  isAnswerRequiredAndInvalid(index: number): boolean {
    const questionGroup = this.questions.at(index) as FormGroup;
    const result = questionGroup.get('important')?.value && !questionGroup.get('answer')?.valid;
    return result;
  }
}
