import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
  ) { }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['sign-in']);
  }

  login({ userName, lastName }: any): Observable<any> {
    if (userName === 'levan' && lastName === 'megeneishvili') {
      this.setToken('abcdefghijklmnopqrstuvwxyz');
      this.router.navigate(['main/computers']);
      return of('you are sign in!');
    }
    return throwError(() => new Error('Failed to login'));
  }
}
