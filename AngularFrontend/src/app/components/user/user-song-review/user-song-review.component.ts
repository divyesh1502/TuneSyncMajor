import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ReviewService } from '../../../services/review.service';
import { TokenService } from '../../../services/token.service';
import { AdminService } from '../../../services/admin.service';


@Component({
  selector: 'app-user-song-review',
  templateUrl: './user-song-review.component.html',
  styleUrl: './user-song-review.component.css'
})
export class UserSongReviewComponent implements OnInit, OnChanges {

  reviewData : any = []
  averageRatingCnt:number = 0;
  ratingCnt : any = {
    "5": 0,
    "4":0,
    "3":0,
    "2":0,
    "1":0,
  }

  @Input() songId: number;
  constructor(private reviewService:ReviewService, private tokenService : TokenService, private adminService: AdminService){

  }

  ngOnInit(): void {
    // if(this.songId != null){
    //   this.loadReviewData()
    // }
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['songId'] && !changes['songId'].firstChange) {
      this.ratingCnt = {
        "5": 0,
        "4":0,
        "3":0,
        "2":0,
        "1":0,
      }
      this.reviewData = []
      this.loadReviewData();
      this.getAverageRating();
    }
  }

  getAverageRating(){
    this.reviewService.getAverageRatings(this.songId).subscribe((res)=>{
      this.averageRatingCnt = res;
    })
  }

  loadReviewData(){
    this.reviewService.getReviewOfSong(this.songId).subscribe((res)=>{

      res.forEach(element => {
        this.adminService.getUserById(element.userId).subscribe((userData)=>{
          element.userName = userData.name;
          var path = userData.profileImage.split("\\");
          element.userImg = `assets/profileImages/${path[path.length - 1]}`;
          element.notRatingStarCnt = 5 - parseInt(element.rating) ;
          this.ratingCnt[element.rating] = this.ratingCnt[element.rating] + 1;
        })
      });
      console.log(res);
      this.reviewData = res;
      
    })
  }

  

  stars: boolean[] = Array(5).fill(false); 
  reviewTitle: string = '';
  reviewContent: string = '';

  selectStar(index: number): void {
    for (let i = 0; i <= index; i++) {
      this.stars[i] = true;
    }
    for (let i = index + 1; i < this.stars.length; i++) {
      this.stars[i] = false;
    }
  }

  isStarFilled(index: number): boolean {
    return this.stars[index];
  }

  submitReview(): void {
    const selectedStarsCount = this.stars.filter(star => star).length;

    var body = {
      "id": 0,
      "userId": this.tokenService.getUserID(),
      "songId": this.songId,
      "rating": selectedStarsCount,
      "review_title": this.reviewTitle,
      "review_desc": this.reviewContent
    }
    
    this.reviewService.addRatings(body).subscribe((res)=>{
      console.log(res);
      this.ratingCnt = {
        "5": 0,
        "4":0,
        "3":0,
        "2":0,
        "1":0,
      }
      this.loadReviewData();
      this.getAverageRating();

      

      for (let i = 0; i < 5; i++) {
        this.stars[i] = false;
      }
      this.reviewTitle = "";
      this.reviewContent = "";
      alert(res.msg);
    })
  }

  getLoopCount(rating): number[] {
    // console.log(rating);
    
    if(rating != null){
      return new Array(rating);
    }else{
      return new Array(0)
    }
  }


}
