import { Component, EventEmitter, Input, Output } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { EstadoGlobalGuardarDatosService } from '../../../../../core/guardardatos/estado-global-guardar-datos.service';
import { ApipeticionesService } from '../../../../../core/servicios/apipeticiones.service';

@Component({
  selector: 'app-modulos-usuarios',
  standalone: true,
  imports: [],
  templateUrl: './modulos-usuarios.component.html',
  styleUrl: './modulos-usuarios.component.css'
})
export class ModulosUsuariosComponent {
  @Output() estadoModal = new EventEmitter<boolean>();
  url = import.meta.env.NG_APP_API + "/modulos"; // URL de la API
  clicKCerrarModal() {
    this.estadoModal.emit(false)
  }

  constructor(private estado_global : EstadoGlobalGuardarDatosService, private api: ApipeticionesService) { }
  ngOnInit(): void {
    console.log(this.estado_global.getDatosServicioGlobal());
    initFlowbite()
    this.getModulos(); // Llamada a la función para obtener usuarios al inicializar el componente

  }

  modulos: any[] = []

  getModulos(): void {
    this.api.getApi(this.url).subscribe({
      next: (data: any) => {
        this.modulos = data; 
        console.log('Modulos:', this.modulos);
      },
      error: (error: any) => {
        console.error('Error al obtener usuarios:', error);
      }
    });
  }

  seleccionarTodoChecks(event: any) {
    const isChecked = event.target.checked;
    console.log('isChecked:', isChecked);
    this.modulos.forEach(modulo => modulo.estado = !isChecked);
  }

}
