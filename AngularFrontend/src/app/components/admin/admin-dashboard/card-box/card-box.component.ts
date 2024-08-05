import { Component, OnInit } from '@angular/core';
import { SongService } from '../../../../services/song.service';

@Component({
  selector: 'app-card-box',
  templateUrl: './card-box.component.html',
  styleUrls: ['./card-box.component.css'],
})
export class CardBoxComponent  implements OnInit {

  songTableLength: number;
  userCount: number;
  artistCount: number;

  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.getSongTableLength();
    this.getUserCount();
    this.getArtistCount();
  }

  getSongTableLength(): void {
    this.songService.getSongTableLength().subscribe(length => {
      this.songTableLength = length;
    });
  }

  getUserCount(): void {
    this.songService.getUserCount().subscribe(count => {
      this.userCount = count;
    });
  }

  getArtistCount(): void {
    this.songService.getArtistCount().subscribe(count => {
      this.artistCount = count;
    });
  }

}
