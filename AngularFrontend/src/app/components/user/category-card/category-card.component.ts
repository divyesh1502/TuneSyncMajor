import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongService } from '../../../services/song.service';
import { ReviewService } from '../../../services/review.service';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent implements OnInit{
  songs: any = [];
  categoryName: string;

  constructor(private route: ActivatedRoute, private songService: SongService, private adminService: AdminService, private reviewService: ReviewService){}

  ngOnInit(): void {

    const categoryType = this.route.snapshot.paramMap.get('categoryType');
    this.categoryName = categoryType;
    // console.log(categoryType);
    

    // this.songService.getSongByCategory(categoryType).subscribe((res) => {
    //   this.songs = res;
    // })

    this.songService.getSongByCategory(categoryType).subscribe(
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
        this.songs = res;
      }
    );
  }

  toggleNavigation() {
    let toggle = document.querySelector(".toggle");
    let navigation = document.querySelector(".navigation");
    let main = document.querySelector(".main");

    navigation.classList.toggle("active");
    main.classList.toggle("active");
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
