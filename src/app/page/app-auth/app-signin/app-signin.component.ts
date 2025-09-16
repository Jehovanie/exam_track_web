import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../@core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, RefreshCcw } from 'lucide-angular';

@Component({
  selector: 'app-app-signin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    LucideAngularModule,
  ],
  templateUrl: './app-signin.component.html',
  styles: ``,
})
export class AppSigninComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  readonly RefreshCcw = RefreshCcw;

  constructor(private router: Router, public au_s: AuthService) {}

  // Logout method to remove token and redirect to login page
  signin(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and password are required.';
      return;
    }

    this.au_s.login(this.email, this.password).subscribe({
      next: (res) => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login failed', err);
        this.errorMessage = 'Invalid email or password.';
      },
    });

    // Redirect the user to the signin page
  }
}
