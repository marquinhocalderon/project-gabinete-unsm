import { Component } from '@angular/core';
import { ApipeticionesService } from '../../../../core/servicios/apipeticiones.service';
import { PostUsuariosComponent } from './post-usuarios/post-usuarios.component';
import { ModulosUsuariosComponent } from './modulos-usuarios/modulos-usuarios.component';
import { PutUsuariosComponent } from "./put-usuarios/put-usuarios.component";
import { EstadoGlobalGuardarDatosService } from '../../../../core/guardardatos/estado-global-guardar-datos.service';
import { PermisosUsuariosComponent } from './permisos-usuarios/permisos-usuarios.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [PostUsuariosComponent, ModulosUsuariosComponent, PutUsuariosComponent, PermisosUsuariosComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  usuarios: any[] = []; // Variable para almacenar los usuarios
  url = import.meta.env.NG_APP_API + "/peticion/usuarios/all"; // URL de la API

  estadomodalModulosActualizar: boolean = false;

  estadomodalPermisos: boolean = false;

  estadomodalUsuarios: boolean = false;

  constructor(private api: ApipeticionesService, private estado_global : EstadoGlobalGuardarDatosService) { }

  ngOnInit(): void {
    this.getUsuarios(); // Llamada a la función para obtener usuarios al inicializar el componente
  }
  
  funcionEditarModulos(data: any) {
    this.estado_global.setDatosServicioGlobal(data);
    this.estadomodalModulosActualizar = true;
  }


  funcionEditarUsuarios(data: any) {
    this.estado_global.setDatosServicioGlobal(data);
    this.estadomodalUsuarios = true;
  }

  funcionEditarPermisos(data: any) {
    this.estado_global.setDatosServicioGlobal(data);
    this.estadomodalPermisos = true;
  }

  recogerModalCerrar(event: any) {
    console.log(event);
    if (!event) {
      this.estadomodalModulosActualizar = false;
      this.estadomodalPermisos = false;
      this.estadomodalUsuarios = false
    }
  }


  recogerCompletado(event: any) {
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
  clickEliminar(id: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Esta acción no se puede deshacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const url = import.meta.env.NG_APP_API + '/usuarios/' + id;
        this.api.deleteApi(url).subscribe({
          next: () => {
            Swal.fire(
              '¡Eliminado!',
              'El registro ha sido eliminado correctamente.',
              'success'
            ).then(() => {
              this.getUsuarios();
            });
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
    });
  }
}