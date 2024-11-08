import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EstadoGlobalGuardarDatosService } from '../../../core/guardardatos/estado-global-guardar-datos.service';
import { initFlowbite } from 'flowbite';
import { CommonModule } from '@angular/common';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';
import { ApipeticionesService } from '../../../core/servicios/apipeticiones.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-historialbackupfacultades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historialbackupfacultades.component.html',
  styleUrl: './historialbackupfacultades.component.css',
  providers: [DatePipe]
})
export class HistorialbackupfacultadesComponent {
  @Input() modalId!: string;
  @Output() estadoModal = new EventEmitter<boolean>();

  urlArchivoasver: string = import.meta.env.NG_APP_API + '/file/txt/';
  datos: any;
  datosHistorial: any 

  datoFacultad: any; 

  constructor(private datosglobales: EstadoGlobalGuardarDatosService, private datePipe: DatePipe, private apiservicios: ApipeticionesService, private http: HttpClient) {}

  ngOnInit(): void {
    initFlowbite();
    this.datoFacultad = this.datosglobales.getDatosServicioGlobal()
    this.getBackupfacultades();
  }

  getBackupfacultades(): void {
    const url = import.meta.env.NG_APP_API + '/backups/facultad/' + this.datoFacultad.id; ;
    this.apiservicios.getApi(url).subscribe({
      next: (response: any) => {
        this.datos = response;
        this.datosHistorial = response.historial_subidos;
        console.log(this.datosHistorial);
      },
      error: (error: any) => {
        console.error('Error al obtener datos:', error);
      }
    });
  }

  clickCerrarModal(): void {
    this.estadoModal.emit(false);
  }

  formatFecha(fecha: string): string {
    return this.datePipe.transform(fecha, 'dd-MM-yyyy') || '';
  }

  downloadRowDocuments(documents: any[], gabinete: string, fecha: string): void {
    const zip = new JSZip();
    const folder = zip.folder("documentos"); // Crear una carpeta en el zip

    // Verifica si la carpeta se creó correctamente
    if (!folder) {
      console.error("Error al crear la carpeta en el zip.");
      return;
    }

    const fetchPromises: Promise<void>[] = [];

    documents.forEach(doc => {
      const docUrl = this.urlArchivoasver + doc.documento;

      const fetchPromise = fetch(docUrl)
        .then(response => {
          if (!response.ok) throw new Error(`No se pudo obtener ${docUrl}`);
          return response.blob();
        })
        .then(blob => {
          folder.file(doc.documento, blob);
        });

      fetchPromises.push(fetchPromise);
    });

    Promise.all(fetchPromises)
      .then(() => {
        const zipName = `${gabinete}_${fecha}.zip`;
        return zip.generateAsync({ type: "blob" }).then(content => {
          saveAs(content, zipName);
        });
      })
      .catch(error => {
        console.error("Error al descargar documentos:", error);
      });
  }

  openFileInNewTab(documento: string): void {
    const fileUrl = `${this.urlArchivoasver}${documento}`;
    this.http.get(fileUrl, { responseType: 'blob' }).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const newWindow = window.open(url);
      if (newWindow) {
        newWindow.opener = null;
      }
    });
  }
}
