import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSongReviewComponent } from './user-song-review.component';

describe('UserSongReviewComponent', () => {
  let component: UserSongReviewComponent;
  let fixture: ComponentFixture<UserSongReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSongReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSongReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
