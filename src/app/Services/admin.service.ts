// doctor.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'https://localhost:7189/api/User/w';

  constructor(private http: HttpClient) { }

  get(): Observable<any> {

    return this.http.post(`${this.apiUrl}`,{});
  }
}
