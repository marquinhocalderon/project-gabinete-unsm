import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutfacultadesComponent } from './putfacultades.component';

describe('PutfacultadesComponent', () => {
  let component: PutfacultadesComponent;
  let fixture: ComponentFixture<PutfacultadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PutfacultadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutfacultadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
