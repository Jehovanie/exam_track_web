import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor() {}

  // Check if token exists
  private hasToken(): boolean {
    return localStorage.getItem('authToken') !== null;
  }

  // Call this when user logs in
  login() {
    localStorage.setItem('authToken', "tay");
    this.loggedIn.next(true);
  }

  // Call this when user logs out
  logout() {
    localStorage.removeItem('authToken');
    this.loggedIn.next(false);
  }
}
