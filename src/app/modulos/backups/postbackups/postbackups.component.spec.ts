import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostbackupsComponent } from './postbackups.component';

describe('PostbackupsComponent', () => {
  let component: PostbackupsComponent;
  let fixture: ComponentFixture<PostbackupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostbackupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostbackupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
