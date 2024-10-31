import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialbackupfacultadesComponent } from './historialbackupfacultades.component';

describe('HistorialbackupfacultadesComponent', () => {
  let component: HistorialbackupfacultadesComponent;
  let fixture: ComponentFixture<HistorialbackupfacultadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialbackupfacultadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialbackupfacultadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
