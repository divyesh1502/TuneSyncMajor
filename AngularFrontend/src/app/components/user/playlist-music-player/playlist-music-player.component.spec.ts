import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistMusicPlayerComponent } from './playlist-music-player.component';

describe('PlaylistMusicPlayerComponent', () => {
  let component: PlaylistMusicPlayerComponent;
  let fixture: ComponentFixture<PlaylistMusicPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaylistMusicPlayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaylistMusicPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
