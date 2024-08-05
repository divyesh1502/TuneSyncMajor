import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistCardItemComponent } from './artist-card-item.component';

describe('ArtistCardItemComponent', () => {
  let component: ArtistCardItemComponent;
  let fixture: ComponentFixture<ArtistCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtistCardItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtistCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
