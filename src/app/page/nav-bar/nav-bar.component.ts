import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LogOut } from 'lucide-angular';
import { AuthService } from '../../@core/services/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styles: ``,
})
export class NavBarComponent {
  readonly LogOut = LogOut;

  constructor(private router: Router, public au_s: AuthService) {}

  // Logout method to remove token and redirect to login page
  logout(): void {
    this.au_s.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/signin']);
      },
      error: (err) => {
        console.error('Logout failed', err);
      },
    })
    // Redirect the user to the signin page
  }

}
