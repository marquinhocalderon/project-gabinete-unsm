import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { initFlowbite } from 'flowbite';
import Swal from 'sweetalert2';
import { ApipeticionesService } from '../../../core/servicios/apipeticiones.service';
import { TokensService } from '../../../core/auth/tokens.service';
import { EstadoGlobalGuardarDatosService } from '../../../core/guardardatos/estado-global-guardar-datos.service';

@Component({
  selector: 'app-putgabinites',
  standalone: true,
  imports: [],
  templateUrl: './putgabinites.component.html',
  styleUrl: './putgabinites.component.css'
})
export class PutgabinitesComponent {

  @Output() estadoModal3 = new EventEmitter<boolean>();

  clickCerrarModal(): void {
    this.estadoModal3.emit(false);
  }

  urlArchivoasver: string = import.meta.env.NG_APP_API + '/file/imagen/';
  constructor(private apipeteciones: ApipeticionesService, private authService: TokensService, private estadoglobalcontodo : EstadoGlobalGuardarDatosService , private changeDetectorRef: ChangeDetectorRef ) { }

  perfildeSesion: any;
  idUsuario: any;

  datos: any;

imagenesBackend2 : any[] = [];

ngOnInit(): void {
  // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  // Add 'implements OnInit' to the class.
  initFlowbite();
  this.getdataFacultad();

  this.datos = this.estadoglobalcontodo.getDatosServicioGlobal();

  // Actualiza el arreglo que maneja las imágenes, excluyendo objetos con imagen null
  this.imagenesBackend2 = this.datos.imagenes.filter((item: any) => item.imagen !== null);


  const decode = this.authService.decodeToken();
  if (decode) {
    this.perfildeSesion = decode.roles;
    this.idUsuario = decode.sub;
  }
}


  limpiarformulario(e: any) {
    e.preventDefault();
    const formulario = document.getElementById('formulario') as HTMLFormElement;
    if (formulario) {
      // Selecciona todos los elementos del formulario excepto el campo 'numerocaso'
      const elementos = formulario.querySelectorAll('input:not(#numerocaso)');
      // Itera sobre los elementos seleccionados y establece su valor en vacío
      elementos.forEach((elemento: any) => {
        elemento.value = '';
      });
    }
    this.imagenes = [];
    this.fieldlocked = true;
    this.imagenesBackend2 = this.datos.imagenes.slice(); // Actualiza el arreglo que maneja las imágenes
    this.estadoModal3.emit(false);
  }

  datosfacultad: any[] = []
  getdataFacultad(){

    const url = import.meta.env.NG_APP_API + '/facultades';

    this.apipeteciones.getApi(url).subscribe({
      next: (data: any) => {
        this.datosfacultad = data;
      },
      error: (error: any) => {
        console.log(error);
      }
    })

  }

  showModal: boolean = false;
  imagenes: any = [];
  mostrarModal: boolean = false;
  fieldlocked: boolean = true;
  totalImages: number = 0;

  lastSelectedFiles: any;

  onFileSelected(event: any) {
    const files = event.target.files;
  
    const input = event.target;
    if (input.files && input.files.length > 0) {
      this.lastSelectedFiles = input.files;
    } else {
      if (this.lastSelectedFiles) {
        const dataTransfer = new DataTransfer();
        for (let i = 0; i < this.lastSelectedFiles.length; i++) {
          dataTransfer.items.add(this.lastSelectedFiles[i]);
        }
        input.files = dataTransfer.files;
      }
    }
  
    if (files) {
      // Actualizar total de imágenes
      this.totalImages = this.imagenesBackend2.length + this.imagenes.length;
  
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
  
        // Verificar si el archivo no supera los 15 MB
        const fileSizeInMB = file.size / (1024 * 1024);
        if (fileSizeInMB > 15) {
          alert('¡El tamaño de la imagen no debe superar los 15 MB!');
          if (this.imagenes.length === 0) {
            const fileInput = document.getElementById('file_input3') as HTMLInputElement;
            fileInput.value = '';
          }
          continue; // Saltar a la siguiente iteración si el archivo es demasiado grande
        }
  
        // Verificar el total de imágenes
        if (this.totalImages >= 3) {
          const fileInput = document.getElementById('file_input3') as HTMLInputElement;
          fileInput.value = '';
          alert('¡Ya has alcanzado el límite de 3 imágenes!');
          break; // Salir del bucle si se alcanza el límite
        }
  
        const imageUrl = URL.createObjectURL(file); // Obtén la URL temporal
        const guardarFileyURL = { file: file, url: imageUrl };
  
        // Verificar si la imagen ya está en la lista
        const existingImage = this.imagenes.find((img: any) => img.file.name === file.name);
        if (existingImage) {
          const fileInput = document.getElementById('file_input3') as HTMLInputElement;
          fileInput.value = '';
          alert('¡Imagen repetida!');
        } else {
          this.imagenes.push(guardarFileyURL);
          this.totalImages++; // Incrementar el contador de imágenes
        }
      }
    }
  }
  

  eliminarImagen(url: any) {
    const index = this.imagenes.findIndex((item: any) => item.url === url);
    if (index !== -1) {
      this.imagenes.splice(index, 1);
    }
    if (this.imagenes.length === 0) {
      const fileInput = document.getElementById(
        'file_input3'
      ) as HTMLInputElement;
      fileInput.value = '';
    }
  }

  imagenesBackend: any[] = [];

  eliminarImagenParaBackend(url: any) {
    const index = this.imagenesBackend2.findIndex((item: any) => item.imagen === url);
    
    if (index !== -1) {
        // Eliminar la imagen de datos.imagenes
        // Asegúrate de actualizar la lista de imágenes en el backend, si es necesario
        this.imagenesBackend.push(this.imagenesBackend2[index]);
        this.imagenesBackend2.splice(index, 1);

        this.changeDetectorRef.detectChanges();
    }

}

  

  
  linkimagen: string = '';
  modalimg: boolean = false;
  verimagen(link: string) {
    this.linkimagen = link;
    this.modalimg = !this.modalimg;
  }
  cerrarmodalimg() {
    this.modalimg = !this.modalimg;
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  loading: boolean = false;

  enviarFormulario(e: any) {
    e.preventDefault();
   this.loading = true;
   const formData = new FormData(e.target);
    if(this.loading){
      this.estadoglobalcontodo.showLoadingSpinner();
    }

    formData.append('id_usuario', this.idUsuario);
    formData.append('id_gabinete', this.datos.id);

    formData.append('imageneseliminar', JSON.stringify(this.imagenesBackend));
    // Agregar las imágenes al FormData
    for (let i = 0; i < this.imagenes.length; i++) {
      formData.append(
        'imagenes',
        this.imagenes[i].file,
        this.imagenes[i].file.name
      );
    }



    const url = import.meta.env.NG_APP_API + '/gabinetes';

    this.apipeteciones.patchApi(url, formData).subscribe({
      next: (data: any) => {
        Swal.fire({
          title: 'Actualizado!',
          text: '¡Se ha actualizo la información  correctamente!',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          window.location.reload();
        });
      },
      error: (error: any) => {
        console.log(error);
        this.loading = false;
      }
    })

  }


}
