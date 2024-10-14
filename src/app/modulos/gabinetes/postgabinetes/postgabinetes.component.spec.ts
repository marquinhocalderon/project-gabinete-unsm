import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostgabinetesComponent } from './postgabinetes.component';

describe('PostgabinetesComponent', () => {
  let component: PostgabinetesComponent;
  let fixture: ComponentFixture<PostgabinetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostgabinetesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostgabinetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
