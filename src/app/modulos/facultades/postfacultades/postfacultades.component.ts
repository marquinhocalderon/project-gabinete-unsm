import { Component } from '@angular/core';
import { ApipeticionesService } from '../../../core/servicios/apipeticiones.service';
import Swal from 'sweetalert2';
import { TokensService } from '../../../core/auth/tokens.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-postfacultades',
  standalone: true,
  imports: [],
  templateUrl: './postfacultades.component.html',
  styleUrl: './postfacultades.component.css'
})
export class PostfacultadesComponent {

  constructor(private api: ApipeticionesService, private token : TokensService) { }

  id_usuario :any
  ngOnInit(): void {
    
    initFlowbite();
    this.id_usuario = this.token.decodeToken().sub;  
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

    const url = import.meta.env.NG_APP_API + '/facultades';

    this.api.postApi(url, formulario).subscribe({
      next: (data:any) => {
        console.log(data);
        this.loading = false;
        Swal.fire({
          title: 'Facultad creada',
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

}
