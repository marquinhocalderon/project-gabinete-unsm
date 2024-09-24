import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerfotosgabinetesComponent } from './verfotosgabinetes.component';

describe('VerfotosgabinetesComponent', () => {
  let component: VerfotosgabinetesComponent;
  let fixture: ComponentFixture<VerfotosgabinetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerfotosgabinetesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerfotosgabinetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
