import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutUsuariosComponent } from './put-usuarios.component';

describe('PutUsuariosComponent', () => {
  let component: PutUsuariosComponent;
  let fixture: ComponentFixture<PutUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PutUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
