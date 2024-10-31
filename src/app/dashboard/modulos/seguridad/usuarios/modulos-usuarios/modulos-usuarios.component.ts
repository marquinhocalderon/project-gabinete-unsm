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
  }

  clicKCerrarModal() {
    this.estadoModal.emit(false);
  }

  getModulos(): void {
    this.api.getApi(this.url).subscribe({
      next: (data: any) => {
        this.modulos = data;
        this.getModulosQueTieneUsuario();
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
        console.log(
          'Modulos que tiene el usuario:',
          this.modulosQuetieneUsuario
        );
        this.modulos.forEach((modulo) => {
          const moduloUsuario = this.modulosQuetieneUsuario.find(
            (m: any) => m.id === modulo.id
          );
          if (moduloUsuario) {
            modulo.estado = moduloUsuario.habilitado;
          }
        });

        // Verifica el estado de "Seleccionar todo" después de actualizar los módulos
        this.actualizarSeleccionarTodo();
      },
      error: (error: any) => {
        console.error('Error al obtener módulos del usuario:', error);
      },
    });
  }

  actualizarSeleccionarTodo(): void {
    this.seleccionarTodo = this.modulos.every((modulo) => modulo.estado);
  }

  seleccionarTodoChecks(event: any): void {
    let checkeado = event.target.checked;
    this.modulos.forEach((modulo) => (modulo.estado = checkeado));
    this.actualizarSeleccionarTodo();
  }

  chequeoDeTodoLosModulos(event: any, modulo: any): void {
    modulo.estado = event.target.checked;
    this.actualizarSeleccionarTodo();
  }
  loading : any
  enviarDatos(e: any): void {
    this.loading = true;
    e.preventDefault();

    if(this.loading){
      this.estado_global.showLoadingSpinner();
    }


    const elementosFormulario = e.target.elements;
    const modulosParaSusPermisos: { id: string; habilitado: boolean }[] = [];

    for (let i = 0; i < elementosFormulario.length; i++) {
      const elemento = elementosFormulario[i];

      if (elemento.name && elemento.type === 'checkbox') {
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
          window.location.reload();
          this.loading = false;
        });
      },
      error: (error: any) => {
        console.error('Error al actualizar permisos:', error);
        this.loading = false;
      }
    });
  }
}