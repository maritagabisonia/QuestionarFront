import { Injectable } from '@angular/core';
import { subject } from '../Models/Subject';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  public subjects: subject[] =[];

  constructor(public http: HttpClient) { }

  getSubjects(): Observable<subject[]> {
    return this.http.get<subject[]>("https://localhost:7189/api/Subjects/get_subjects");

  };
}
