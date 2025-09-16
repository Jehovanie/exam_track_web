import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environements/environement';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.SERVER_URL;

  readonly isLoggedIn = signal<boolean>(false);
  readonly loadingLogin = signal<boolean>(false);

  constructor(private http: HttpClient) {
    this.isLoggedIn.set(!!localStorage.getItem('authToken'));
  }

  // Call this when user logs in
  login(email: string, password: string): Observable<{ token: string }> {
    this.loadingLogin.set(true);

    return this.http
      .post<{ token: string }>(`${this.baseUrl}/login`, {
        email,
        password,
      })
      .pipe(
        tap((res) => {
          localStorage.setItem('authToken', res.token);
          this.isLoggedIn.set(true);
          this.loadingLogin.set(false);
        }),
        catchError((err: any) => {
          console.error('Login error', err);
          this.isLoggedIn.set(false);
          this.loadingLogin.set(false);
          throw err;
        })
      );
  }

  // Call this when user logs in
  signup(email: string, password: string): Observable<{ message: string }> {
    this.loadingLogin.set(true);

    return this.http
      .post<{ message: string }>(`${this.baseUrl}/register`, {
        email,
        password,
      })
      .pipe(
        tap((res) => {
          this.loadingLogin.set(false);
        }),
        catchError((err: any) => {
          console.error('Signup error', err);
          this.loadingLogin.set(false);
          throw err;
        })
      );
  }

  // Call this when user logs out
  logout(): Observable<{ message: string }> {
    return of<{ message: string }>({ message: 'Logged out' }).pipe(
      tap(() => {
        localStorage.removeItem('authToken');
        this.isLoggedIn.set(false);
      })
    );
  }
}
