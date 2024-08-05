import { Component, OnInit } from '@angular/core';
import { SongService } from '../../../../services/song.service';
import { AdminService } from '../../../../services/admin.service';
import { TokenService } from '../../../../services/token.service';
import { ReviewService } from '../../../../services/review.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss'],
})
export class SongListComponent  implements OnInit {

  songs: any[] = [];
  artistId: number;
  constructor(private songService: SongService, private adminService: AdminService, private tokenService: TokenService, private reviewService: ReviewService) { }

  ngOnInit() {
    this.artistId = this.tokenService.getUserID();

    this.songService.getSongsByArtistId(this.artistId).subscribe((res) => {

      res.forEach((element: any) => {
        this.adminService.getArtistById(parseInt(element.artistId)).subscribe((artistDetails) => {
          
          this.reviewService.getAverageRatings(element.id).subscribe((averageRating)=>{

            element.averageRating = averageRating;
            element.artistName = artistDetails.name;
            var imageFilePath = element.imageFilePath.split(`\\`);
            element.imageFilePath = `assets/images/` + imageFilePath[imageFilePath.length - 1];
            // console.log(songs.imageFilePath);
  
  
            var audioFilePath = element.audioFilePath.split(`\\`);
            element.audioFilePath = `assets/audio/` + audioFilePath[audioFilePath.length - 1];
            
          });
          })
      });
      this.songs = res;
      console.log(res);

    });
  }


  getStarRating(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const starsArray: string[] = Array(fullStars).fill('star');

    if (hasHalfStar) {
      starsArray.push('star-half');
    }

    const remainingStars = 5 - starsArray.length;
    for (let i = 0; i < remainingStars; i++) {
      starsArray.push('star-outline');
    }

    return starsArray;
  }

}
