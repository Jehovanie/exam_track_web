import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../@core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, RefreshCcw } from 'lucide-angular';

@Component({
  selector: 'app-app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LucideAngularModule],
  templateUrl: './app-signup.component.html',
  styles: ``,
})
export class AppSignupComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  readonly RefreshCcw = RefreshCcw;

  constructor(private router: Router, public au_s: AuthService) {}

  // Logout method to remove token and redirect to login page
  signup(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and password are required.';
      return;
    }

    this.au_s.signup(this.email, this.password).subscribe({
      next: (res) => {
        this.errorMessage = 'Votre compte est bien crée.';
        setTimeout(() => {
          this.router.navigate(['/auth/signin']);
        }, 1000);
      },
      error: (err) => {
        console.error('Login failed', err);
      },
    });

    // Redirect the user to the signin page
  }
}
