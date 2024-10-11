import { Component, EventEmitter, Input, Output } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { EstadoGlobalGuardarDatosService } from '../../../core/guardardatos/estado-global-guardar-datos.service';

@Component({
  selector: 'app-verfotosgabinetes',
  standalone: true,
  imports: [],
  templateUrl: './verfotosgabinetes.component.html',
  styleUrl: './verfotosgabinetes.component.css'
})
export class VerfotosgabinetesComponent {

  @Input() modalId!: string;
  @Output() estadoModal = new EventEmitter<boolean>();

  constructor(private datosglobales : EstadoGlobalGuardarDatosService) { }

  urlArchivoasver: string = import.meta.env.NG_APP_API + '/file/imagen/';
  datos: any 
  ngOnInit(): void {
    initFlowbite();

    this.datos = this.datosglobales.getDatosServicioGlobal();
    console.log(this.datos);
  }

  clickCerrarModal(): void {
    this.estadoModal.emit(false);
  }

}
