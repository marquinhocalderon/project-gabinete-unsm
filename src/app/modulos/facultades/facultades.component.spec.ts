import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultadesComponent } from './facultades.component';

describe('FacultadesComponent', () => {
  let component: FacultadesComponent;
  let fixture: ComponentFixture<FacultadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
