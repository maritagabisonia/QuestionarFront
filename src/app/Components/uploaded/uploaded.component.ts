import { Component } from '@angular/core';
import { UploadedService } from '../../Services/uploaded.service';
import { NgFor } from '@angular/common';
import { Answer } from '../../Models/Answer';

@Component({
  selector: 'app-uploaded',
  standalone: true,
  imports: [NgFor],
  templateUrl: './uploaded.component.html',
  styleUrl: './uploaded.component.css'
})
export class UploadedComponent {
  items: any[] = [];
  answers: Answer[] =[];
  name:string="";

  constructor(private uploadService: UploadedService) { }

  ngOnInit(): void {
    this.uploadService.getusers().subscribe(data => {
      this.uploadService.UserList = data
      this.items = data;
      console.log(this.items)
    });
  }
  getAnswers(item: any){
    console.log(item.id)
    this.uploadService.getAnswers(item.id).subscribe(data => {
      this.name=item.fullName
      this.uploadService.AnswersList = data
      this.answers = data;
      console.log(this.answers)
    });
  }
}
