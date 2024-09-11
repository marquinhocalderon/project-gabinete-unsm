import { Component, EventEmitter, Input, Output } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { EstadoGlobalGuardarDatosService } from '../../../../../core/guardardatos/estado-global-guardar-datos.service';
import { ApipeticionesService } from '../../../../../core/servicios/apipeticiones.service';
import { TokensService } from '../../../../../core/auth/tokens.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modulos-usuarios',
  standalone: true,
  imports: [],
  templateUrl: './modulos-usuarios.component.html',
  styleUrl: './modulos-usuarios.component.css',
})
export class ModulosUsuariosComponent {
  @Output() estadoModal = new EventEmitter<boolean>();
  url = import.meta.env.NG_APP_API + '/modulos'; // URL de la API
  seleccionarTodo: boolean = false;
  modulos: any[] = [];
  modulosQuetieneUsuario: any[] = [];
  id_usuario: any;

  constructor(
    private estado_global: EstadoGlobalGuardarDatosService,
    private api: ApipeticionesService
  ) {}

  ngOnInit(): void {
    initFlowbite();
    this.id_usuario = this.estado_global.getDatosServicioGlobal().id;
    this.getModulos();
    this.getModulosQueTieneUsuario();
  }

  clicKCerrarModal() {
    this.estadoModal.emit(false);
  }

  getModulos(): void {
    this.api.getApi(this.url).subscribe({
      next: (data: any) => {
        this.modulos = data;
        this.actualizarSeleccionarTodo();
      },
      error: (error: any) => {
        console.error('Error al obtener módulos:', error);
      },
    });
  }

  getModulosQueTieneUsuario(): void {
    const urlUsuarios =
      import.meta.env.NG_APP_API + '/peticion/usuarios/' + this.id_usuario;

    this.api.getApi(urlUsuarios).subscribe({
      next: (data: any) => {
        this.modulosQuetieneUsuario = data[0].modulos_para_actualizar;
        this.modulos.forEach((modulo) => {
          const moduloUsuario = this.modulosQuetieneUsuario.find(
            (m: any) => m.id === modulo.id
          );
          if (moduloUsuario) {
            modulo.estado = moduloUsuario.habilitado;
          }
        });
        this.actualizarSeleccionarTodo();
      },
      error: (error: any) => {
        console.error('Error al obtener módulos del usuario:', error);
      },
    });
  }

  estaCheckeado:any

// Actualiza el estado de "Seleccionar todo" si todos los módulos están seleccionados
actualizarSeleccionarTodo(): void {
  this.seleccionarTodo = this.modulos.every((modulo) => modulo.estado);
  console.log('Estado de seleccionar todo:', this.seleccionarTodo);
}

// Controla el cambio de estado del checkbox "Seleccionar todo"
seleccionarTodoChecks(event: any): void {
  this.estaCheckeado = event.target.checked;
  // Cambia el estado de todos los módulos según "Seleccionar todo"
  this.modulos.forEach((modulo) => (modulo.estado = this.estaCheckeado));
  // Actualiza el estado general
  this.actualizarSeleccionarTodo();
}

// Controla el cambio de estado de los checkboxes individuales
chequeoDeTodoLosModulos(event: any, modulo: any): void {
  modulo.estado = event.target.checked;

  // Verifica si todos los módulos están seleccionados o no
  this.actualizarSeleccionarTodo();
}
  

  enviarDatos(e: any): void {
    e.preventDefault();

    const elementosFormulario = e.target.elements;
    const modulosParaSusPermisos: { id: string; habilitado: boolean }[] = [];

    for (let i = 0; i < elementosFormulario.length; i++) {
      const elemento = elementosFormulario[i];

      // Verificar si el elemento tiene un atributo 'name' y si es un checkbox
      if (elemento.name && elemento.type === 'checkbox') {
        // Agregar el objeto al arreglo 'modulos'
        modulosParaSusPermisos.push({
          id: elemento.name,
          habilitado: elemento.checked,
        });
      }
    }

    const urlPermisos =
      import.meta.env.NG_APP_API +
      '/peticion/modulospermisos/' +
      this.id_usuario;

      this.api.patchApi(urlPermisos, modulosParaSusPermisos).subscribe({
        next: (data: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Permisos Modulos Actualizados',
            showConfirmButton: true,
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false
          }).then(() => {
            this.estadoModal.emit(false);
          });
        },
        error: (error: any) => {
          console.error('Error al actualizar permisos:', error);
        }
      });
      
  }
}
