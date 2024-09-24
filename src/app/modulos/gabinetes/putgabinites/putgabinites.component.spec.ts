import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutgabinitesComponent } from './putgabinites.component';

describe('PutgabinitesComponent', () => {
  let component: PutgabinitesComponent;
  let fixture: ComponentFixture<PutgabinitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PutgabinitesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutgabinitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
