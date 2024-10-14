import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguridadAsideComponent } from './seguridad-aside.component';

describe('SeguridadAsideComponent', () => {
  let component: SeguridadAsideComponent;
  let fixture: ComponentFixture<SeguridadAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeguridadAsideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeguridadAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
