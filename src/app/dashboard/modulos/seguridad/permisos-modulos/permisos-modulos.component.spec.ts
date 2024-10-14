import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosModulosComponent } from './permisos-modulos.component';

describe('PermisosModulosComponent', () => {
  let component: PermisosModulosComponent;
  let fixture: ComponentFixture<PermisosModulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermisosModulosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermisosModulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
