import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ApipeticionesService } from '../../../../../core/servicios/apipeticiones.service';
import { initFlowbite } from 'flowbite';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-usuarios',
  standalone: true,
  imports: [],
  templateUrl: './post-usuarios.component.html',
  styleUrl: './post-usuarios.component.css'
})
export class PostUsuariosComponent {
  @Output() PostCompletado = new EventEmitter<any>();

  
  @ViewChild('cerrarBoton') cerrarBotonRef!: ElementRef;


  perfiles: any[] = []; // Variable para almacenar los usuarios
  url_perfiles = import.meta.env.NG_APP_API + "/perfiles"; // URL de la API
  url_usuarios = import.meta.env.NG_APP_API + "/usuarios"; // URL de la API

  constructor(private api: ApipeticionesService) { }

  ngOnInit(): void {
    initFlowbite(); // Inicializar Flowbite
    this.getPerfiles(); // Llamada a la función para obtener usuarios al inicializar el componente
  }

  showPassword : any

  mirarContrasena(e: any) {
    if (e.target.checked) {
      this.showPassword = true;
    } else {
      this.showPassword = false
    }
  }


  getPerfiles(): void {
    this.api.getApi(this.url_perfiles).subscribe({
      next: (data: any) => {
        this.perfiles = data; // Asignar los datos recibidos a la variable ''
        
      },
      error: (error: any) => {
        console.error('Error al obtener usuarios:', error);
      }
    });
  }

  loading: boolean = false;

  enviarDatos(e: any) {
    e.preventDefault();
    this.loading = true;
    const formulario = new FormData(e.target);

    this.api.postApi(this.url_usuarios, formulario).subscribe({
      next: (data: any) => {
        this.loading = false;
        Swal.fire({
          title: 'Exitoso',
          text: 'Registro creado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.PostCompletado.emit(true);
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
