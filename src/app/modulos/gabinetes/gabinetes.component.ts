import { Component } from '@angular/core';
import { PostgabinetesComponent } from './postgabinetes/postgabinetes.component';
import { ApipeticionesService } from '../../core/servicios/apipeticiones.service';
import { initFlowbite } from 'flowbite';
import { VerfotosgabinetesComponent } from './verfotosgabinetes/verfotosgabinetes.component';

@Component({
  selector: 'app-gabinetes',
  standalone: true,
  imports: [PostgabinetesComponent, VerfotosgabinetesComponent],
  templateUrl: './gabinetes.component.html',
  styleUrl: './gabinetes.component.css'
})
export class GabinetesComponent {

  constructor(private apiservicios: ApipeticionesService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getdata();
    initFlowbite();
  }

  urlArchivoasver: string = import.meta.env.NG_APP_API + '/file/imagen/';

  datos: any[] = [];

  getdata(){
    const url = import.meta.env.NG_APP_API + '/gabinetes';
    this.apiservicios.getApi(url).subscribe({
      next: (data: any) => {
        console.log(data);
        this.datos = data;
      },
      error: (error: any) => {
        console.log(error); 
      }
    })
  }

}
