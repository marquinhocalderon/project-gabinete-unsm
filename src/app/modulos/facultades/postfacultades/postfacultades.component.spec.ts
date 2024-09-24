import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostfacultadesComponent } from './postfacultades.component';

describe('PostfacultadesComponent', () => {
  let component: PostfacultadesComponent;
  let fixture: ComponentFixture<PostfacultadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostfacultadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostfacultadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
