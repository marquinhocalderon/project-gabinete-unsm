import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InicioHomeComponent } from './dashboard/modulos/inicio-home/inicio-home.component';
import { UsuariosComponent } from './dashboard/modulos/seguridad/usuarios/usuarios.component';

export const routes: Routes = [
  {
    title: 'Login',
    path: '',
    component: LoginComponent,
  },
  
  {
    title: 'Dashboard',
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: InicioHomeComponent,
      },
      {
        path: 'seguridad',
        children: [
          {
            path: 'usuarios',
            component: UsuariosComponent,
          },
        ]
      }
    ]
  },
  { path: '**', component: NotfoundComponent , title: '404 - Not Found'},
];