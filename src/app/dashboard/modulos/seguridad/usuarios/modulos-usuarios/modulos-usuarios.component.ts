import { Component, EventEmitter, Input, Output } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { EstadoGlobalGuardarDatosService } from '../../../../../core/guardardatos/estado-global-guardar-datos.service';

@Component({
  selector: 'app-modulos-usuarios',
  standalone: true,
  imports: [],
  templateUrl: './modulos-usuarios.component.html',
  styleUrl: './modulos-usuarios.component.css'
})
export class ModulosUsuariosComponent {
  @Output() estadoModal = new EventEmitter<boolean>();

  clicKCerrarModal() {
    this.estadoModal.emit(false)
  }

  constructor(private estado_global : EstadoGlobalGuardarDatosService) { }
  ngOnInit(): void {
    console.log(this.estado_global.getDatosServicioGlobal());
    initFlowbite()
  }

}
