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


  loading:boolean = false;  
  enviarDatos(e:any){
    e.preventDefault();
    this.loading = true;
    
    const formData = new FormData(e.target);

    const formulario = {
      facultad: formData.get('facultad'),
      id_usuario: String(this.id_usuario)
    }

    const url = import.meta.env.NG_APP_API + '/facultades/' + this.datos.id;

    this.api.patchApi(url, formulario).subscribe({
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
