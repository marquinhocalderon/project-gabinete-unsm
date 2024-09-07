import { Component } from '@angular/core';
import { ApipeticionesService } from '../../../../core/servicios/apipeticiones.service';
import { PostUsuariosComponent } from './post-usuarios/post-usuarios.component';
import { ModulosUsuariosComponent } from './modulos-usuarios/modulos-usuarios.component';
import { PutUsuariosComponent } from "./put-usuarios/put-usuarios.component";
import { ChangeDetectorRef } from '@angular/core';
import { EstadoGlobalGuardarDatosService } from '../../../../core/guardardatos/estado-global-guardar-datos.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [PostUsuariosComponent, ModulosUsuariosComponent, PutUsuariosComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  usuarios: any[] = []; // Variable para almacenar los usuarios
  url = import.meta.env.NG_APP_API + "/peticion/usuarios/all"; // URL de la API

  estadomodalModulosActualizar: boolean = false;

  constructor(private api: ApipeticionesService, private cdr: ChangeDetectorRef, private estado_global : EstadoGlobalGuardarDatosService) { }

  ngOnInit(): void {
    this.getUsuarios(); // Llamada a la función para obtener usuarios al inicializar el componente
  }
  
  modulosEditar(data: any) {
    this.estado_global.setDatosServicioGlobal(data);
    this.estadomodalModulosActualizar = true;
    this.cdr.detectChanges(); // Forzar la detección de cambios
  }

  recogerModalCerrar(event: any) {
    console.log(event);
    if (!event) {
      this.estadomodalModulosActualizar = false;
    }
  }


  recogerPostCompletado(event: any) {
    if (event) {
      this.getUsuarios(); // Llamada a la función para obtener usuarios al completar el registro
      }
  }

  getUsuarios(): void {
    this.api.getApi(this.url).subscribe({
      next: (data: any) => {
        this.usuarios = data; // Asignar los datos recibidos a la variable 'usuarios'
        
      },
      error: (error: any) => {
        console.error('Error al obtener usuarios:', error);
      }
    });
  }
}