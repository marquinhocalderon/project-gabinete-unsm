import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { ApipeticionesService } from '../../core/servicios/apipeticiones.service';
import { TokensService } from '../../core/auth/tokens.service';
import { CommonModule } from '@angular/common';
import { SeguridadAsideComponent } from './seguridad-aside/seguridad-aside.component';

@Component({
  selector: 'app-aside-menu',
  standalone: true,
  imports: [RouterModule, CommonModule, SeguridadAsideComponent],
  templateUrl: './aside-menu.component.html',
  styleUrl: './aside-menu.component.css'
})
export class AsideMenuComponent {

  constructor(private api: ApipeticionesService, private respuestaToken: TokensService) { }

  idUsuario: any;
  modulosQuetieneUsuario: any = [];

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