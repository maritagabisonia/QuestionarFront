import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuestionsService } from '../../Services/questions.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AnswerDTO, QuestionDTO } from '../../Models/QuestionDTO';
import { UserForm } from '../../Models/UserForm ';
import { Answer } from '../../Models/Answer';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { subject } from '../../Models/Subject';
import { SubjectsService } from '../../Services/subjects.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-full-quiz',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, ConfirmDialogModule, ToastModule,RadioButtonModule,DropdownModule],
  templateUrl: './full-quiz.component.html',
  styleUrls: ['./full-quiz.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class FullQuizComponent implements OnInit {
  quizForm: FormGroup;
  questionsList: QuestionDTO[] = [];
  submitted = false;
  selectedSubject: any;
  public subjects: subject[] =[];


  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private questionsService: QuestionsService,
    public subjectService:SubjectsService,
    public router:Router
  ) {
    this.quizForm = this.fb.group({
      fullname: ['', Validators.required],
      questions: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.getSubjects();
    this.readQuestions(0);

  }
  
  onSubjectChange(event: any): void {
    console.log('Selected subject:', this.selectedSubject);
    //  this.readQuestions(this.selectedSubject);
    if(this.selectedSubject !== undefined && this.selectedSubject !== null){
      this.readQuestions(this.selectedSubject);
      console.log('Selected subject changeddddddd:', this.selectedSubject);
      this.router.navigate(['Questionnaire', this.selectedSubject])

    }
    if(this.selectedSubject === null){
      this.readQuestions(0);
      console.log('Selected subject changeddddddddddddddddddddd:', this.selectedSubject);

    }

  }

  getSubjects(){
    this.subjectService.getSubjects().subscribe(res=>{
      console.log(res);
      this.subjectService.subjects=res;
      this.subjects=res
   
  })
  }
  createQuestion(question: QuestionDTO): FormGroup {
    return this.fb.group({
      id: [question.id],
      question: [question.question, Validators.required],
      important: [question.important],
      numberOfAnswers: [question.numberOfAnswers],
      answers: this.fb.array(question.answers.map(answer => 
      question.numberOfAnswers === 1 ? this.createAnswer(answer) : this.createmultiAnswer(answer),

      ))
     
    });
  }


  createmultiAnswer(answer: AnswerDTO): FormGroup {
    console.log(1)
    return this.fb.group({
     answer: [answer.answer, Validators.required],    
     selectedAnswer:['']

    });
  }
  
  createAnswer(answer: AnswerDTO): FormGroup {
    return this.fb.group({
      answer: ['', Validators.required],
    });
  }
  readQuestions(id: number) {
    const questionsArray = this.quizForm.get('questions') as FormArray;
    questionsArray.clear()

    this.questionsService.readQuestions(id).subscribe({
      next: (questions: QuestionDTO[]) => {
        this.questionsList = questions;
        questions.forEach(question =>
          questionsArray.push(this.createQuestion(question))
        );
      }
    });
  }

  get questionsFormArray(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }
  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }
  getAnswersFormArray(index: number): FormArray {
    return this.questionsFormArray.at(index).get('answers') as FormArray;
  }

  onSubmit() {
    this.submitted = true;
    if (this.quizForm.invalid) {
      this.quizForm.markAllAsTouched(); 
    }
  
    if (this.quizForm.valid) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to submit the form?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const formValue = this.quizForm.value;
          
          const userForm = {
            fullname: formValue.fullname,
            answers: formValue.questions.flatMap((q: any) => {
              return q.numberOfAnswers > 1 
                ? q.answers
                    .filter((a: any) => a.selectedAnswer) 
                    .map((a: any) => ({
                      answer: a.selectedAnswer,
                      question: q.question
                    }))
                : q.answers
                    .filter((a: any) => a.answer) 
                    .map((a: any) => ({
                      answer: a.answer,
                      question: q.question
                    }));
            })
          };
  
          console.log(userForm);
  
          this.questionsService.parseJsonAnswers([userForm]).subscribe(
            res => {
              console.log('Submission successful', res);
              this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Form Submitted' });
            },
            err => {
              console.error('Submission error', err);
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Submission failed' });
            }
          );
        },
        reject: () => {
          this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected' });
        }
      });
    }
  }
 
  isAnswerRequiredAndInvalid(index: number): boolean {
    const questionGroup = this.questions.at(index) as FormGroup;
    return questionGroup.get('important')?.value && !questionGroup.get('selectedAnswer')?.valid;
  }

  castToFormArray(abstractControl: AbstractControl): FormArray {
    return abstractControl as FormArray;
  }
}
