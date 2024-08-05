import { Component, OnInit } from '@angular/core';
import { SongService } from '../../../../services/song.service';
import { AdminService } from '../../../../services/admin.service';
import { TokenService } from '../../../../services/token.service';

@Component({
  selector: 'app-artist-card-box',
  templateUrl: './artist-card-box.component.html',
  styleUrls: ['./artist-card-box.component.scss'],
})
export class ArtistCardBoxComponent  implements OnInit {

  songCnt: number = 0;
  totalLikeCnt: number = 0;
  artistId: number;

  constructor(private songService: SongService, private adminService: AdminService, private tokenService: TokenService) { }

  ngOnInit() {
    this.artistId = this.tokenService.getUserID();
    this.updateSongCnt();
  }
  updateSongCnt(){
    this.songService.getSongsByArtistId(this.artistId).subscribe((res) => {
      this.songCnt = res.length;
      var likeCnt = 0;
      res.forEach(element => {
        this.totalLikeCnt += element.likeCount;
      });
      console.log(res);
      
    });
  }

}
