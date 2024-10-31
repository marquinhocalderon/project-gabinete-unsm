import { Component, EventEmitter, Output } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { EstadoGlobalGuardarDatosService } from '../../../../../core/guardardatos/estado-global-guardar-datos.service';
import { ApipeticionesService } from '../../../../../core/servicios/apipeticiones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-permisos-usuarios',
  standalone: true,
  imports: [],
  templateUrl: './permisos-usuarios.component.html',
  styleUrl: './permisos-usuarios.component.css',
})
export class PermisosUsuariosComponent {
  @Output() estadoModal = new EventEmitter<boolean>();
  url = import.meta.env.NG_APP_API + '/modulos'; // URL de la API
  modulosQueTieneUsuario: any[] = [];
  id_usuario: number = 1; // Cambia esto por el ID de tu usuario actual
  loading = false;
  constructor(private api: ApipeticionesService, private estado_global:EstadoGlobalGuardarDatosService) {}

  clicKCerrarModal() {
    this.estadoModal.emit(false);
  }

  ngOnInit(): void {
    initFlowbite();
    this.id_usuario = this.estado_global.getDatosServicioGlobal().id;
    this.getModulosQueTieneUsuario();
  }

  getModulosQueTieneUsuario(): void {
    const urlUsuarios =
      import.meta.env.NG_APP_API + '/peticion/usuariospermisos/' + this.id_usuario;

    this.api.getApi(urlUsuarios).subscribe({
      next: (data: any) => {

        this.modulosQueTieneUsuario = data[0].modulos_para_actualizar;
        console.log(
          'Modulos que tiene el usuario:',
          this.modulosQueTieneUsuario
        );

        this.verificarSeleccionInicial();



      },
      error: (error: any) => {
        console.error('Error al obtener módulos del usuario:', error);
      },
    });
  }


    // Verificar si todos los permisos están seleccionados al cargar los datos
    verificarSeleccionInicial(): void {
      this.modulosQueTieneUsuario.forEach((modulo: any) => {
        const todosSeleccionados = modulo.sub_modulos.every((submodulo: any) =>
          submodulo.permisos.every((permiso: any) => permiso.value)
        );
        
        // Si todos los permisos están seleccionados, marcar "Seleccionar todo"
        modulo.todoSeleccionado = todosSeleccionados;
      });
  
    }

  // Función para alternar la selección de todos los permisos de un módulo
  alternarSeleccionarTodo(modulo: any, event: any): void {
    const todoSeleccionado = event.target.checked;

    // Actualizar todos los permisos del módulo según el estado de "Seleccionar todo"
    modulo.sub_modulos.forEach((submodulo: any) => {
      submodulo.permisos.forEach((permiso: any) => {
        permiso.value = todoSeleccionado;
      });
    });

    // Actualizar el estado de "Seleccionar todo"
    modulo.todoSeleccionado = todoSeleccionado;
  }

  // Función para actualizar la selección de un permiso individual
  actualizarSeleccionPermiso(
    modulo: any,
    submodulo: any,
    permiso: any,
    event: any
  ): void {
    permiso.value = event.target.checked;

    // Verificar si todos los permisos del módulo están seleccionados
    const todosSeleccionados = modulo.sub_modulos.every((submodulo: any) =>
      submodulo.permisos.every((permiso: any) => permiso.value)
    );

    // Actualizar el estado del checkbox "Seleccionar todo" basado en la selección de los permisos individuales
    modulo.todoSeleccionado = todosSeleccionados;
  }

  enviarDatos(e: any): void {
    this.loading = true;
    e.preventDefault();

    if(this.loading){
      this.estado_global.showLoadingSpinner();
    }

  
    const elementosFormulario = e.target.elements;
    const modulosParaSusPermisos: any[] = []; // Lista para almacenar módulos y permisos
  
    // Recorre todos los elementos del formulario
    for (let i = 0; i < elementosFormulario.length; i++) {
      const elemento = elementosFormulario[i];
  
      // Solo tomamos los elementos que sean checkboxes y que tengan un name
      if (elemento.name && elemento.type === 'checkbox') {
        // Busca si ya existe el módulo en la lista de módulos
        let modulo = modulosParaSusPermisos.find(
          (m) => m.id === elemento.id.split('-')[1] // Asume que el id tiene un formato como 'checkbox-idModulo'
        );
  
        if (!modulo) {
          // Si no existe, lo agregamos
          modulo = {
            id: elemento.id.split('-')[1], // Extrae el id del módulo (por ejemplo, 'modulo1' de 'checkbox-modulo1')
            permisos: [],
          };
          modulosParaSusPermisos.push(modulo);
        }
  
        // Agregar el permiso con su type y value (checked)
        modulo.permisos.push({
          type: elemento.name, // El name del checkbox es el type del permiso
          value: elemento.checked, // El valor checked es el value del permiso
        });
      }
    }
  
    console.log('Datos enviados:', modulosParaSusPermisos);

    
    const urlPermisos =
      import.meta.env.NG_APP_API +
      '/peticion/submodulospermisos/' +
      this.id_usuario;

    this.api.patchApi(urlPermisos, modulosParaSusPermisos).subscribe({
      next: (data: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Permisos Actualizados Para Este Usuario',
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
        console.error('Error al guardar los datos:', error);
        this.loading = false;
      },
    });
  }
  


}
