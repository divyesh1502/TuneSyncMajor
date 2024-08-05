import { Component,OnInit } from '@angular/core';
import { SongService } from '../../../services/song.service';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../../../services/token.service';
import { AdminService } from '../../../services/admin.service';
import { ReviewService } from '../../../services/review.service';

@Component({
  selector: 'app-liked-songs',
  templateUrl: './liked-songs.component.html',
  styleUrl: './liked-songs.component.css'
})
export class LikedSongsComponent implements OnInit{
  likedSongs: any[] = [];

  toggleNavigation(){
    // console.log("toggle Clicked");
    
    let toggle = document.querySelector(".toggle");
    let navigation = document.querySelector(".navigation");
    let main = document.querySelector(".main");

    navigation.classList.toggle("active");
    main.classList.toggle("active");
  }

  constructor(private http: HttpClient, private songService: SongService, private tokenService: TokenService, private adminService: AdminService,  private reviewService: ReviewService) { }
  ngOnInit():void { 
    this.getFavSongList();
  }

  getFavSongList(){
    this.songService.getFavSongList(this.tokenService.getUserID()).subscribe((res)=>{
      res.forEach(element => {
        this.likedSongs.push(element.song)
      });

      // this.likedSongs.forEach(element => {
      //   var filePath = element.imageFilePath.split(`\\`);
      //   // console.log(filePath);
      //   element.imageFilePath = filePath[filePath.length - 1]
        
      // });

      this.likedSongs.forEach((element: any) => {
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

    })
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
