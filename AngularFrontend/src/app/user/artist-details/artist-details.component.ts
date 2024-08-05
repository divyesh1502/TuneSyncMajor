import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongService } from '../../../services/song.service';
import { AdminService } from '../../../services/admin.service';
import { ReviewService } from '../../../services/review.service';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrl: './artist-details.component.css'
})
export class ArtistDetailsComponent implements OnInit {
  artistSongs: any = [];
  artistName: string = '';
  artistImg: string = '';

  constructor(private route: ActivatedRoute, private songService: SongService, private adminService: AdminService, private reviewService: ReviewService) { }

  ngOnInit() {
    const id: number = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    this.getSongByArtist(id);
    this.getArtistDetails(id);
  }

  toggleNavigation() {
    let toggle = document.querySelector(".toggle");
    let navigation = document.querySelector(".navigation");
    let main = document.querySelector(".main");

    navigation.classList.toggle("active");
    main.classList.toggle("active");
  }

  getArtistDetails(id) {
    this.adminService.getArtistById(parseInt(id)).subscribe((artistDetails)=>{
      this.artistName = artistDetails.name;
  
      var imageFilePath = artistDetails.profileImage.split(`\\`);
      this.artistImg = `assets/profileImages/` + imageFilePath[imageFilePath.length - 1];
    })
  }

  getSongByArtist(id: number) {
    this.songService.getSongsByArtistId(id).subscribe((res) => {
      res.forEach((element: any) => {
        this.adminService.getArtistById(parseInt(element.artistId)).subscribe((artistDetails) => {


          this.reviewService.getAverageRatings(element.id).subscribe((averageRating) => {

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
      this.artistSongs = res;
      console.log(res)
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
