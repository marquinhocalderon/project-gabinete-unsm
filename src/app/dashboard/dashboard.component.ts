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
  tienePermisos: boolean = false;
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


  datosMostarMenu: any 

  getModulosQueTieneUsuario(): void {
    const urlUsuarios = import.meta.env.NG_APP_API + '/peticion/usuarios/' + this.idUsuario;

    this.api.getApi(urlUsuarios).subscribe({
      next: (data: any) => {
        this.modulosQuetieneUsuario = data[0]?.modulos_para_mostrar_menu;
        this.datosMostarMenu = data[0]?.modulos_para_actualizar
        console.log('datosMostarMenu', this.datosMostarMenu);
        this.verificarPermisos();
      },
      error: (error: any) => {
        console.error('Error al obtener módulos del usuario:', error);
      },
    });
  }
  verificarPermisos(): void {
    // Encontrar el módulo 'seguridad'
    const moduloSeguridad = this.datosMostarMenu.find((modulo: any) => modulo.nombre_modulo === 'seguridad');
    
    if (moduloSeguridad) {
      // Encontrar el submódulo 'usuarios' dentro del módulo 'seguridad'
      const subModuloUsuarios = moduloSeguridad.sub_modulos.find((sub_modulo: any) => sub_modulo.nombre_submodulo === 'usuarios');
  
      if (subModuloUsuarios) {
        // Verificar si todos los permisos en el submódulo 'usuarios' tienen valor 'true'
        this.tienePermisos = subModuloUsuarios.permisos.every((permiso: any) => permiso.value === true);
      } else {
        this.tienePermisos = false; // Si no se encuentra el submódulo 'usuarios', no tiene permisos
      }
    } else {
      this.tienePermisos = false; // Si no se encuentra el módulo 'seguridad', no tiene permisos
    }
    
    // Mostrar en la consola si tiene permisos en 'usuarios' dentro del módulo 'seguridad' o no
    console.log('tienePermisos para usuarios dentro de seguridad:', this.tienePermisos); // Esto imprimirá true o 
  }  
  

}
