import { Component } from '@angular/core';
import { SongService } from '../../../../services/song.service';
import { AdminService } from '../../../../services/admin.service';
import { ReviewService } from '../../../../services/review.service';

@Component({
  selector: 'app-popular-songs',
  templateUrl: './popular-songs.component.html',
  styleUrl: './popular-songs.component.css'
})
export class PopularSongsComponent {
  popularSongs: any = []
  constructor(private songService: SongService, private adminService: AdminService, private reviewService: ReviewService) { }
  ngOnInit(): void {
    this.loadPopularSongs();
  }
  loadPopularSongs(): void {


    this.songService.getPopularSongs().subscribe(
      (res: any) => {
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
        this.popularSongs = res;
      }
    );
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
