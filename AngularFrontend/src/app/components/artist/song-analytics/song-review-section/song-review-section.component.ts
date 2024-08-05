import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from '../../../../services/song.service';
import { AdminService } from '../../../../services/admin.service';
import { ReviewService } from '../../../../services/review.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-song-review-section',
  templateUrl: './song-review-section.component.html',
  styleUrls: ['./song-review-section.component.css'],
})
export class SongReviewSectionComponent implements OnInit {

  songs: any={};
  artistName:string = "";
  songId:number;
  reviewData : any = []
  
  averageRatingCnt:number = 0;
  ratingCnt : any = {
    "5": 0,
    "4":0,
    "3":0,
    "2":0,
    "1":0,
  }

  constructor(private route: ActivatedRoute, private songService: SongService, private adminService: AdminService, private reviewService:ReviewService, private router: Router) { }

  ngOnInit() { 
    
    const id = this.route.snapshot.paramMap.get('id');
    this.songId = parseInt(id);
    console.log(id);
    this.getSongById(id);
    this.loadReviewData();
    this.getAverageRating();
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
      // console.log(this.ratingCnt);

      this.reviewData = res;
      
    })
  }

  stars: boolean[] = Array(5).fill(false);
  reviewTitle: string = '';
  reviewContent: string = '';


  getSongById(id): void{
    // this.songService.getSongById(id).subscribe((res)=>{
    //   this.songs = res;
    //   console.log(this.songs)
    // })

    this.songService.getSongById(parseInt(id)).subscribe((songs: any) => {
      console.log(songs);
  
      // this.songs = songs;
      this.adminService.getArtistById(parseInt(songs.artistId)).subscribe((artistDetails) => {
        this.artistName = artistDetails.name;
      })
      var imageFilePath = songs.imageFilePath.split(`\\`);
      songs.imageFilePath = `assets/images/`+imageFilePath[imageFilePath.length - 1];
      // console.log(songs.imageFilePath);
  
  
      var audioFilePath = songs.audioFilePath.split(`\\`);
      songs.audioFilePath = `assets/audio/` + audioFilePath[audioFilePath.length - 1];
  
      this.songs = (songs)

      console.log(songs);
      
      
  
    });
  }
  getLoopCount(rating): number[] {
    // console.log(rating);
    
    if(rating != null){
      return new Array(rating);
    }else{
      return new Array(0)
    }
  }


  removeSong(id){

    Swal.fire({
      title: 'Are you sure?',
      text: `Really you want to remove ${this.songs.songName} song??`,
      icon: 'info',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm!',
      cancelButtonText: 'Cancel',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.songService.removeSong(id).subscribe((res)=>{

          Swal.fire('Deleted!', 'Song has been deleted successfully.', 'success');
          console.log(res);

          // this.route.
          this.router.navigate(['/artist/dashboard']);
          
        })
      }
    });
  }

}
