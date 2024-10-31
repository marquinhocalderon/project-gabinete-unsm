import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AsideMenuComponent } from './aside-menu/aside-menu.component';
import { ApipeticionesService } from '../core/servicios/apipeticiones.service';
import { TokensService } from '../core/auth/tokens.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarMenuComponent,RouterOutlet, AsideMenuComponent,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private api: ApipeticionesService, private respuestaToken: TokensService) { }

  idUsuario: any;
  modulosQuetieneUsuario: any = [];

  sidebarAbierto: boolean = false;

  recogerRespuestaDelHijo(event: boolean) {
    this.sidebarAbierto = event;
    console.log('sidebarAbierto', this.sidebarAbierto);
  }

  ngOnInit(): void {
    const decodeToken = this.respuestaToken.decodeToken();
    this.idUsuario = decodeToken.sub;
    this.getModulosQueTieneUsuario();
    initFlowbite();
  }



  getModulosQueTieneUsuario(): void {
    const urlUsuarios = import.meta.env.NG_APP_API + '/peticion/usuarios/' + this.idUsuario;

    this.api.getApi(urlUsuarios).subscribe({
      next: (data: any) => {
        this.modulosQuetieneUsuario = data[0]?.modulos_para_mostrar_menu;
      },
      error: (error: any) => {
        console.error('Error al obtener módulos del usuario:', error);
      },
    });
  }

}
