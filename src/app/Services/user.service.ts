import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogIn } from '../Models/LogIn';
import { Observable } from 'rxjs/internal/Observable';
import { SignUp } from '../Models/SignUp';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  get_user_by_token(): Observable<any> {

    return this.http.get("https://localhost:7189/api/User/get_user_by_token" );
  }
  LogIn(user: LogIn): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.post<any>("https://localhost:7189/api/User/logIn", user , httpOptions);
  };
  registerUser(user: SignUp): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.post<any>("https://localhost:7189/api/User/register_user", user , httpOptions);
  }
  get_user_by_id(id:number): Observable<any> {

    return this.http.get("https://localhost:7189/api/User/get_user_by_id?id=" + id);
  }
}
