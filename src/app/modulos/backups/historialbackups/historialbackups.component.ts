import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EstadoGlobalGuardarDatosService } from '../../../core/guardardatos/estado-global-guardar-datos.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-historialbackups',
  standalone: true,
  imports: [],
  templateUrl: './historialbackups.component.html',
  styleUrl: './historialbackups.component.css'
})
export class HistorialbackupsComponent {


  @Input() modalId!: string;
  @Output() estadoModal = new EventEmitter<boolean>();

  constructor(private datosglobales : EstadoGlobalGuardarDatosService) { }

  urlArchivoasver: string = import.meta.env.NG_APP_API + '/file/txt/';
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

