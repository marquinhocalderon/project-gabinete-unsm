import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';

export const routes: Routes = [
  {
    title: 'Login',
    path: '',
    component: LoginComponent,
  },
  { path: '**', component: NotfoundComponent , title: '404 - Not Found'},
];
