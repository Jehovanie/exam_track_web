import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './page/nav-bar/nav-bar.component';
import { AuthService } from './@core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    NavBarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'exam_track_web';

  isLoggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }
}
