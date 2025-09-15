import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../@core/services/auth/auth.service';

@Component({
  selector: 'app-app-signin',
  standalone: true,
  imports: [],
  templateUrl: './app-signin.component.html',
  styles: ``,
})
export class AppSigninComponent {
  constructor(private router: Router, private authService: AuthService) {}

  // Logout method to remove token and redirect to login page
  signin(): void {
    this.authService.login();

    // Redirect the user to the signin page
    this.router.navigate(['/dashboard']);
  }
}
