import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApipeticionesService {

  constructor(private http: HttpClient ) { }

  // Métodos para realizar la consulta a la API

  public getApi(url: string): Observable<any> {
    return this.http.get(url);
  }

  public postApi(url: string, datos: any): Observable<any> {
    return this.http.post(url, datos);
  }

  public patchApi(url: string, datos: any): Observable<any> {
    return this.http.patch(url, datos);
  }

  public deleteApi(url: string): Observable<any> {
    return this.http.delete(url);
  }
}
