import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'; // Ensure you have imported Swal

@Injectable({
  providedIn: 'root'
})
export class EstadoGlobalGuardarDatosService {
  private datosServicio: any = null; // Initialize to null or a default value

  constructor() { }

  setDatosServicioGlobal(dato: any): void {
    this.datosServicio = dato;
  }

  getDatosServicioGlobal(): any {
    return this.datosServicio;
  }

  showLoadingSpinner(): void { // Renamed for clarity
    Swal.fire({
      title: 'Guardando',
      html: `
          <style>
            .spinner {
              border: 4px solid rgba(0, 0, 0, 0.1);
              width: 36px;
              height: 36px;
              border-radius: 50%;
              border-left-color: #09f;
              animation: spin 1s linear infinite;
              display: inline-block;
              margin-top: 10px;
            }
      
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          </style>
          <div>Se está guardando la información, por favor esperar...</div>
          <div class="spinner"></div>
        `,
      icon: 'info',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      showCancelButton: false,
      timerProgressBar: true,
    });
  }
}
