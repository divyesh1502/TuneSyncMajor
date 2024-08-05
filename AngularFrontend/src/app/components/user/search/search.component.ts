import { Component, OnInit, SimpleChanges } from '@angular/core';
import { SearchService } from '../../../services/search.service';
import { Subscription } from 'rxjs';
import { SongService } from '../../../services/song.service';
import { AdminService } from '../../../services/admin.service';
import { ReviewService } from '../../../services/review.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  searchTerm: string = '';

  songList: any = [];

  private subscription: Subscription;

  songSubscription: Subscription;

  constructor(private sharedService: SearchService, private songService: SongService, private adminService: AdminService, private reviewService: ReviewService) {
    this.subscription = this.sharedService.search$.subscribe(term => {
      this.searchTerm = term;
      this.getAllSongs();
    });
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getAllSongs() {
    this.songService.getSongs().subscribe((res) => {
      var temp:any = [];
      res.forEach((element: any) => {
        this.adminService.getArtistById(parseInt(element.artistId)).subscribe((artistDetails) => {

          this.reviewService.getAverageRatings(element.id).subscribe((averageRating) => {

            element.averageRating = averageRating;
            element.artistName = artistDetails.name;
            var imageFilePath = element.imageFilePath.split(`\\`);
            element.imageFilePath = `assets/images/` + imageFilePath[imageFilePath.length - 1];

            var audioFilePath = element.audioFilePath.split(`\\`);
            element.audioFilePath = `assets/audio/` + audioFilePath[audioFilePath.length - 1];

            if (element.songName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
              element.category.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
              element.language.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
              element.artistName.toLowerCase().includes(this.searchTerm.toLowerCase())) {
              temp.push(element);
            }
          });
        })
      });

      this.songList = temp;
    })
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
