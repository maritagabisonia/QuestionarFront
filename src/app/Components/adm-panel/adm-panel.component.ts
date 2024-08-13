import { Component, OnInit } from '@angular/core';
import { QuestionFormComponent } from '../question-form/question-form.component';
import { QuestionsListComponent } from '../questions-list/questions-list.component';
import { QuestionJsonFormComponent } from '../question-json-form/question-json-form.component';
import { AddedQuestionsComponent } from '../added-questions/added-questions.component';
import { QuestionJSONmodel } from '../../Models/QuestionForJSONmodel';
import { subject } from '../../Models/Subject';
import { SubjectsService } from '../../Services/subjects.service';
import {  ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-adm-panel',
  standalone: true,
  imports: [ QuestionFormComponent, QuestionsListComponent, QuestionJsonFormComponent, AddedQuestionsComponent,ReactiveFormsModule,DropdownModule,FormsModule],
  templateUrl: './adm-panel.component.html',
  styleUrl: './adm-panel.component.css'
})
export class AdmPanelComponent implements OnInit{
  question!:QuestionJSONmodel;
  public subjects: subject[] =[];
  selectedSubject: any;

  
  constructor(public subjectService:SubjectsService){}

  ngOnInit(): void {
    this.subjectService.getSubjects().subscribe(res=>{
        console.log(res);
        this.subjectService.subjects=res;
        this.subjects=res
     
    })

  }

  onQuestionAdded(newQuestion: QuestionJSONmodel): void {
    console.log('New question added:', newQuestion);
    this.question =newQuestion;
  }
  
  onSubjectChange(event: any): void {
    // console.log('Selected subject:', this.selectedSubject);
  }


  
}
