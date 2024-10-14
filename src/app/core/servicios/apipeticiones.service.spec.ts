import { TestBed } from '@angular/core/testing';

import { ApipeticionesService } from './apipeticiones.service';

describe('ApipeticionesService', () => {
  let service: ApipeticionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApipeticionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
