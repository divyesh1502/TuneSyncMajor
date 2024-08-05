import { Component, OnInit } from '@angular/core';
import { SongService } from '../../../services/song.service';

@Component({
  selector: 'app-more-like-this',
  templateUrl: './more-like-this.component.html',
  styleUrls: ['./more-like-this.component.scss'],
})
export class MoreLikeThisComponent  implements OnInit {

  songs: any[] = [];

  constructor(private songService: SongService) { }

  ngOnInit() {}

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
