import { Component, EventEmitter, Output } from '@angular/core';
import { PostfacultadesComponent } from './postfacultades/postfacultades.component';
import { ApipeticionesService } from '../../core/servicios/apipeticiones.service';
import { PutfacultadesComponent } from "./putfacultades/putfacultades.component";
import { TokensService } from '../../core/auth/tokens.service';
import { EstadoGlobalGuardarDatosService } from '../../core/guardardatos/estado-global-guardar-datos.service';

@Component({
  selector: 'app-facultades',
  standalone: true,
  imports: [PostfacultadesComponent, PutfacultadesComponent],
  templateUrl: './facultades.component.html',
  styleUrl: './facultades.component.css'
})
export class FacultadesComponent {

  constructor(private api: ApipeticionesService, private token : TokensService, private datosglobales : EstadoGlobalGuardarDatosService) { }

  ngOnInit(): void {
      this.getData();
  }

  datos: any[] = [];

  getData(){
    const url= import.meta.env.NG_APP_API + '/facultades';

    this.api.getApi(url).subscribe({
      next: (data:any) => {
        this.datos = data;
      },
      error: (error:any) => {
        console.error('Error al obtener datos:', error);
      }
    })
  }


  verModal: boolean = false;

  mostrarModal(datos: any){
    this.verModal = true;
    this.datosglobales.setDatosServicioGlobal(datos);
  }

  cerrarModal(event: boolean){
    console.log(event);
    this.verModal = event;
  }


}
