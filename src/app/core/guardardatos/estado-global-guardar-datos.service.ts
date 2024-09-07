import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstadoGlobalGuardarDatosService {

  constructor() { }

  private datosServicioById: any
        
  setDatosServicioGlobal(dato:any){
      this.datosServicioById = dato;
  }
  
  getDatosServicioGlobal(){
    return this.datosServicioById;
  }
}
