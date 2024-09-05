import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  {
    title: 'Login',
    path: '',
    component: LoginComponent,
  },
  {
    title: 'Login',
    path: 'dashboard',
    component: DashboardComponent,
  },
  { path: '**', component: NotfoundComponent , title: '404 - Not Found'},
];
