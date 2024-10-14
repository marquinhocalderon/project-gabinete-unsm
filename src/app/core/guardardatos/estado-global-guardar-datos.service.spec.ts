import { TestBed } from '@angular/core/testing';

import { EstadoGlobalGuardarDatosService } from './estado-global-guardar-datos.service';

describe('EstadoGlobalGuardarDatosService', () => {
  let service: EstadoGlobalGuardarDatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoGlobalGuardarDatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
