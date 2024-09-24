import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { ApipeticionesService } from '../../../core/servicios/apipeticiones.service';
import { TokensService } from '../../../core/auth/tokens.service';
import { EstadoGlobalGuardarDatosService } from '../../../core/guardardatos/estado-global-guardar-datos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-postgabinetes',
  standalone: true,
  imports: [],
  templateUrl: './postgabinetes.component.html',
  styleUrl: './postgabinetes.component.css'
})
export class PostgabinetesComponent {

  constructor(private apipeteciones: ApipeticionesService, private authService: TokensService, private estadoglobalcontodo : EstadoGlobalGuardarDatosService ) { }

  perfildeSesion: any;
  idUsuario: any;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    initFlowbite();
    this.getdataFacultad();

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
  }

  datosfacultad: any[] = []
  getdataFacultad(){

    const url = import.meta.env.NG_APP_API + '/facultades';

    this.apipeteciones.getApi(url).subscribe({
      next: (data: any) => {
        console.log(data);
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
        } else if (this.imagenes.length >= 3) {
          alert('¡Ya has alcanzado el límite de 3 imágenes!');
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
    // Agregar las imágenes al FormData
    for (let i = 0; i < this.imagenes.length; i++) {
      formData.append(
        'imagenes',
        this.imagenes[i].file,
        this.imagenes[i].file.name
      );
    }

    const url = import.meta.env.NG_APP_API + '/gabinetes';

    this.apipeteciones.postApi(url, formData).subscribe({
      next: (data: any) => {
        Swal.fire({
          title: '¡Guardado!',
          text: '¡Se ha guardado la información correctamente!',
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
