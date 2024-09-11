import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { EstadoGlobalGuardarDatosService } from '../../../../../core/guardardatos/estado-global-guardar-datos.service';
import { ApipeticionesService } from '../../../../../core/servicios/apipeticiones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-put-usuarios',
  standalone: true,
  imports: [],
  templateUrl: './put-usuarios.component.html',
  styleUrl: './put-usuarios.component.css',
})
export class PutUsuariosComponent {
  @Output() estadoModal = new EventEmitter<boolean>();
  url = import.meta.env.NG_APP_API + '/modulos'; // URL de la API
  seleccionarTodo: boolean = false;
  modulos: any[] = [];
  modulosQuetieneUsuario: any[] = [];
  id_usuario: any;
  loading = false;
  perfiles: any[] = []; // Variable para almacenar los usuarios
  url_perfiles = import.meta.env.NG_APP_API + '/perfiles'; // URL de la API

  constructor(
    private estado_global: EstadoGlobalGuardarDatosService,
    private api: ApipeticionesService
  ) {}
  @Output() PutCompletado = new EventEmitter<any>();
  datos : any
  
  @ViewChild('cerrarBoton') cerrarBotonRef!: ElementRef;


  ngOnInit(): void {
    initFlowbite();
    this.id_usuario = this.estado_global.getDatosServicioGlobal().id;
    this.datos = this.estado_global.getDatosServicioGlobal();
    console.log(this.datos);
    this.getPerfiles();
  }

  getPerfiles(): void {
    this.api.getApi(this.url_perfiles).subscribe({
      next: (data: any) => {
        this.perfiles = data; // Asignar los datos recibidos a la variable ''
      },
      error: (error: any) => {
        console.error('Error al obtener usuarios:', error);
      },
    });
  }
  clicKCerrarModal() {
    this.estadoModal.emit(false);
  }

  showPassword : any

  mirarContrasena(e: any) {
    if (e.target.checked) {
      this.showPassword = true;
    } else {
      this.showPassword = false
    }
  }
  enviarDatos(e: any) {
    e.preventDefault();
    this.loading = true;
    const formulario = new FormData(e.target);

    const   url_usuarios = import.meta.env.NG_APP_API + '/usuarios/' + this.id_usuario; // URL de la API

    this.api.patchApi(url_usuarios, formulario).subscribe({
      next: (data: any) => {
        this.loading = false;
        Swal.fire({
          title: 'Exitoso',
          text: 'Actualizado  correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.PutCompletado.emit(true);
            this.cerrarBotonRef.nativeElement.click();
            this.loading = false;
          }
        })
    
      },
      error: (error: any) => {
        this.loading = false;
      }
    });


  }
}
