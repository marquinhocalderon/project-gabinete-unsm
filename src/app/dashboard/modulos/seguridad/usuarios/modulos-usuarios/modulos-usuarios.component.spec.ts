import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulosUsuariosComponent } from './modulos-usuarios.component';

describe('ModulosUsuariosComponent', () => {
  let component: ModulosUsuariosComponent;
  let fixture: ComponentFixture<ModulosUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModulosUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModulosUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
