import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRatedSongsComponent } from './top-rated-songs.component';

describe('TopRatedSongsComponent', () => {
  let component: TopRatedSongsComponent;
  let fixture: ComponentFixture<TopRatedSongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopRatedSongsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopRatedSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
