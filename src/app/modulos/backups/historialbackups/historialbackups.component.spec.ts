import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialbackupsComponent } from './historialbackups.component';

describe('HistorialbackupsComponent', () => {
  let component: HistorialbackupsComponent;
  let fixture: ComponentFixture<HistorialbackupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialbackupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialbackupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
