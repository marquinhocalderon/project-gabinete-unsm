import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import Swal from 'sweetalert2';
import { ApipeticionesService } from '../../../core/servicios/apipeticiones.service';
import { TokensService } from '../../../core/auth/tokens.service';
import { EstadoGlobalGuardarDatosService } from '../../../core/guardardatos/estado-global-guardar-datos.service';

@Component({
  selector: 'app-postbackups',
  standalone: true,
  imports: [],
  templateUrl: './postbackups.component.html',
  styleUrl: './postbackups.component.css'
})
export class PostbackupsComponent {
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
    this.archivosPdf = [];
  }

  datosfacultad: any[] = []
  getdataFacultad(){

    const url = import.meta.env.NG_APP_API + '/gabinetes';

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


  archivosPdf: any[] = [];
  lastSelectedFiles4 : any
  changePdf(e: any) {
    const files = e.target.files;

    const input = e.target;
    if (input.files && input.files.length > 0) {
      // Almacenar los archivos seleccionados
      this.lastSelectedFiles4 = input.files;
    } else {
      // Restaurar los archivos seleccionados anteriormente si no se seleccionan nuevos archivos
      if (this.lastSelectedFiles4) {
        const dataTransfer = new DataTransfer();
        for (let i = 0; i < this.lastSelectedFiles4.length; i++) {
          dataTransfer.items.add(this.lastSelectedFiles4[i]);
        }
        input.files = dataTransfer.files;
      }
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const guardarFileyURL = { file: file, url: URL.createObjectURL(file) };

      const dataPdf = this.archivosPdf.find(
        (data: any) => data.file.name.toLowerCase() === file.name.toLowerCase()
      );
      if (dataPdf) {
        alert('PDF repetido!');
      } else if (this.archivosPdf.length === 3) {
        alert('Solo se admite 3 pdfs');
        break; // Salir del bucle si se alcanza el límite
      } else {
        this.archivosPdf.push(guardarFileyURL);
      }
    }
  }

  removePdf(url: string) {
    const index = this.archivosPdf.findIndex((item: any) => item.url === url);
    if (index !== -1) {
      this.archivosPdf.splice(index, 1);
    }

    if (this.archivosPdf.length === 0) {
      const fileInput = document.getElementById(
        'file_input_pdf'
      ) as HTMLInputElement;
      fileInput.value = '';
    }
  }

  showModal: boolean = false;
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

    for (let i = 0; i < this.archivosPdf.length; i++) {
      formData.append(
        'archivos',
        this.archivosPdf[i].file,
        this.archivosPdf[i].file.name
      );
    }



    const url = import.meta.env.NG_APP_API + '/backups';

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

