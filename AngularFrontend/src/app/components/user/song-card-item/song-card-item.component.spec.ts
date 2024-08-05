import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongCardItemComponent } from './song-card-item.component';

describe('SongCardItemComponent', () => {
  let component: SongCardItemComponent;
  let fixture: ComponentFixture<SongCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SongCardItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SongCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
