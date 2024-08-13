import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAnswersService {
  public users: string[] = [];


  constructor(public http: HttpClient) { }

  getUsers(): Observable<string[]> {
    console.log(1)
    return this.http.get<string[]>("https://localhost:7189/api/User/get_users");

  };

  get usersList(): string[] {
    return this.users
  }
  set usersList(list: string[]) {
    this.users = list;
  }



}
