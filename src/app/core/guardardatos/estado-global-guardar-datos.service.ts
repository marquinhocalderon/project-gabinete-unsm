import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstadoGlobalGuardarDatosService {

  constructor() { }

  private datosServicio: any
        
  setDatosServicioGlobal(dato:any){
      this.datosServicio = dato;
  }
  
  getDatosServicioGlobal(){
    return this.datosServicio;
  }
}
