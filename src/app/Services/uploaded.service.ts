import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from '../Models/Answer';

@Injectable({
  providedIn: 'root'
})
export class UploadedService {
  users: string[] = [];
  answers: Answer[] = [];


  constructor(public http: HttpClient) { }

  getusers(): Observable<string[]> {
    return this.http.get<string[]>("https://localhost:7189/api/User/get_users");
  };
  getAnswers(id:number): Observable<any> {
    return this.http.get("https://localhost:7189/api/User/get_answers_by_id?id=" + id);
  }

  get UserList(): string[]{
     return this.users
  }
  set UserList(list:string[]){
    this.users = list;
  }
  get AnswersList(): Answer[]{
    return this.answers
 }
 set AnswersList(list:Answer[]){
   this.answers = list;
 }


}
