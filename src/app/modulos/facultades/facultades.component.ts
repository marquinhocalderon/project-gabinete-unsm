import { Component } from '@angular/core';
import { PostfacultadesComponent } from './postfacultades/postfacultades.component';
import { ApipeticionesService } from '../../core/servicios/apipeticiones.service';

@Component({
  selector: 'app-facultades',
  standalone: true,
  imports: [PostfacultadesComponent],
  templateUrl: './facultades.component.html',
  styleUrl: './facultades.component.css'
})
export class FacultadesComponent {

  constructor(private api: ApipeticionesService) { }


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


}
