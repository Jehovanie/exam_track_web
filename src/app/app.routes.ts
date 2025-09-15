import { Routes } from '@angular/router';
import { AppDashboardComponent } from './page/app-dashboard/app-dashboard.component';
import { AppSigninComponent } from './page/app-auth/app-signin/app-signin.component';
import { AppSignupComponent } from './page/app-auth/app-signup/app-signup.component';
import { AppAuthComponent } from './page/app-auth/app-auth.component';
import { authGuard } from './auth.guard';
import { signinGuard } from './page/app-auth/signin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: AppDashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    component: AppAuthComponent,
    canActivate: [signinGuard],
    children: [
      {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full',
      },
      { path: 'signin', component: AppSigninComponent },
      { path: 'signup', component: AppSignupComponent },
    ],
  },
];
