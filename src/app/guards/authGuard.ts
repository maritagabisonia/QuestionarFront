import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private http: HttpClient, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    
    return this.get_user_by_token().pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['']); 
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['']); 
        return of(false);
      })
    );
  }

  get_user_by_token(): Observable<any> {
    return this.http.get("https://localhost:7189/api/User/get_user_by_token");
  }
}
