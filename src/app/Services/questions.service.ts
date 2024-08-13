import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { GetQuestion, Question } from '../Models/Question';
import { Observable } from 'rxjs';
import { UserForm } from '../Models/UserForm ';
import { QuestionJSONmodel } from '../Models/QuestionForJSONmodel';
import { QuestionDTO } from '../Models/QuestionDTO';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  // public questions: Question[] = []
  public quiz: QuestionDTO[] = [ ]
  
  public quizUpdated = new EventEmitter<QuestionDTO[]>();


  constructor(public http: HttpClient) { }


  updatequestion(id:number, question:QuestionJSONmodel[]): Observable<QuestionJSONmodel[]>{
    let httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.post<QuestionJSONmodel[]>("https://localhost:7189/api/Questions/update_question?id=" + id, question , httpOptions);
  }

  readQuestions(id:number):Observable<QuestionDTO[]>{

    return this.http.get<QuestionDTO[]>("https://localhost:7189/api/Questions/read_questions?subjectID=" + id)
  }

  addQustionWithJSON(questions: QuestionJSONmodel[]): Observable<QuestionDTO> {
    let httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.post<QuestionDTO>('https://localhost:7189/api/Questions/parse_json_question', questions, httpOptions);
  }




  getQuestions(): Observable<GetQuestion[]> {
    return this.http.get<GetQuestion[]>("https://localhost:7189/api/User/get_questions");

  };


  addQuestion(question:Question): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.post<any>("https://localhost:7189/api/User/add_question", question , httpOptions);
  };


  updateQuestion(question:GetQuestion): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.put<any>("https://localhost:7189/api/User/update_questions", question , httpOptions);
  }
  parseJsonAnswers(userForms: UserForm[]): Observable<any> {
    console.log(userForms)
    let httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.post<any>(`https://localhost:7189/api/User/parse_json_answers`, userForms, httpOptions);
  }

  add_question_ret_list(question:Question): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.post<any>("https://localhost:7189/api/User/add_question_ret_list", question , httpOptions);
  };




  get QuestionsList(): QuestionDTO[] {
    return this.quiz
  }
  set QuestionsList(list: QuestionDTO[]) {
    this.quiz = list;
  }
}
