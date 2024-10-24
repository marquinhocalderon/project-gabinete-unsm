import { Component, EventEmitter, Output } from '@angular/core';
import { initFlowbite } from 'flowbite';
import Swal from 'sweetalert2';
import { ApipeticionesService } from '../../../core/servicios/apipeticiones.service';
import { TokensService } from '../../../core/auth/tokens.service';
import { EstadoGlobalGuardarDatosService } from '../../../core/guardardatos/estado-global-guardar-datos.service';

@Component({
  selector: 'app-putfacultades',
  standalone: true,
  imports: [],
  templateUrl: './putfacultades.component.html',
  styleUrl: './putfacultades.component.css'
})
export class PutfacultadesComponent {
  
  constructor(private api: ApipeticionesService, private token : TokensService,private datosglobales : EstadoGlobalGuardarDatosService ) { }
  @Output() estadoModal2 = new EventEmitter<boolean>();
  id_usuario :any
  datos : any;
  ngOnInit(): void {
    
    initFlowbite();
    this.datos = this.datosglobales.getDatosServicioGlobal(); 
    this.id_usuario = this.token.decodeToken().sub;  
    console.log(this.id_usuario);
  }

  showModal: boolean = false;
  imagenes: any = [];
  mostrarModal: boolean = false;
  fieldlocked: boolean = true;

  lastSelectedFiles: any;

  onFileSelected(event: any) {
    const files = event.target.files;

    const input = event.target;
    if (input.files && input.files.length > 0) {
      // Almacenar los archivos seleccionados
      this.lastSelectedFiles = input.files;
    } else {
      // Restaurar los archivos seleccionados anteriormente si no se seleccionan nuevos archivos
      if (this.lastSelectedFiles) {
        const dataTransfer = new DataTransfer();
        for (let i = 0; i < this.lastSelectedFiles.length; i++) {
          dataTransfer.items.add(this.lastSelectedFiles[i]);
        }
        input.files = dataTransfer.files;
      }
    }

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Verificar si el archivo no supera los 10 MB
        const fileSizeInMB = file.size / (1024 * 1024);
        if (fileSizeInMB > 15) {
          alert('¡El tamaño de la imagen no debe superar los 15 MB!');
          if (this.imagenes.length === 0) {
            const fileInput = document.getElementById(
              'file_input3'
            ) as HTMLInputElement;
            fileInput.value = '';
          }
          continue; // Saltar a la siguiente iteración si el archivo es demasiado grande
        }

        const imageUrl = URL.createObjectURL(file); // Obtén la URL temporal
        const guardarFileyURL = { file: file, url: imageUrl };

        // Verificar si la imagen ya está en la lista
        const existingImage = this.imagenes.find(
          (img: any) => img.file.name === file.name
        );
        if (existingImage) {
          alert('¡Imagen repetida!');
        } else if (this.imagenes.length >= 1) {
          alert('Solo se admite 1 imagen');
          break; // Salir del bucle si se alcanza el límite
        } else {
          this.imagenes.push(guardarFileyURL);
          console.log(this.imagenes);
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

  linkimagen: string = '';
  modalimg: boolean = false;
  verimagen(link: string) {
    this.linkimagen = link;
    this.modalimg = !this.modalimg;
  }
  cerrarmodalimg() {
    this.modalimg = !this.modalimg;
  }


  loading:boolean = false;  
  enviarDatos(e:any){
    e.preventDefault();
    this.loading = true;
    
    const formData = new FormData(e.target);


    formData.append('id_usuario', String(this.id_usuario));
  
    // Agregar imágenes al FormData
    for (let i = 0; i < this.imagenes.length; i++) {
      formData.append(
        'imagenes',
        this.imagenes[i].file,
        this.imagenes[i].file.name
      );
    }

    formData.append('id_facultad', this.datos.id);

    const url = import.meta.env.NG_APP_API + '/facultades/' ;

    this.api.patchApi(url, formData).subscribe({
      next: (data:any) => {
        console.log(data);
        this.loading = false;
        Swal.fire({
          title: 'Facultad Actualizada',
          icon: 'success',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.reload();
        });
      },
      error: (error:any) => {
        console.error('Error al enviar datos:', error);
        this.loading = false;
      }
    })




  }

  cerrarModal(){
    this.estadoModal2.emit(false);
  }
}
