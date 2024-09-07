import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostUsuariosComponent } from './post-usuarios.component';

describe('PostUsuariosComponent', () => {
  let component: PostUsuariosComponent;
  let fixture: ComponentFixture<PostUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
