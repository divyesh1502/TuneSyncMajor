import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SongService } from '../../../services/song.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { TokenService } from '../../../services/token.service';
import { AdminService } from '../../../services/admin.service';
import { ReviewService } from '../../../services/review.service';
@Component({
  selector: 'app-add-new-song',
  templateUrl: './add-new-song.component.html',
  styleUrls: ['./add-new-song.component.css'],
})
export class AddNewSongComponent implements OnInit {

  addSongForm!: FormGroup;

  imageFile: File = null;
  audioFile: File = null;
  artistId: number;

  songList: any[] = [];
  
  constructor(private songService: SongService, private http: HttpClient, private tokenService: TokenService, private adminService: AdminService, private reviewService: ReviewService) { }

  ngOnInit(): void {

    this.addSongForm = new FormGroup({
      songTitle: new FormControl(null, Validators.required),
      songCategory: new FormControl("", Validators.required),
      songLanguage: new FormControl("", Validators.required),
    })
    this.artistId =  this.tokenService.getUserID();
    this.fetchMusicData();
  }

  toggleNavigation() {
    // console.log("toggle Clicked");

    let toggle = document.querySelector(".toggle");
    let navigation = document.querySelector(".navigation");
    let main = document.querySelector(".main");

    navigation.classList.toggle("active");
    main.classList.toggle("active");
  }


  onCoverSelected(event): void {
    this.imageFile = event.target.files[0];
  }

  onAudioSelected(event): void {
    this.audioFile = event.target.files[0];
  }

  onSubmit(): void {
    this.songService.insertSong(this.addSongForm.value.songTitle, this.addSongForm.value.songCategory, this.addSongForm.value.songLanguage, this.artistId, this.imageFile, this.audioFile)
      .subscribe(
        response => {
          this.fetchMusicData();
          this.addSongForm.reset();
          this.addSongForm.patchValue({
            songCategory: "",
            songLanguage: ""
          })
          this.imageFile = null;
          this.audioFile = null;
          Swal.fire('Added!', `Song successfully added.`, 'success');
        },
        error => {
          console.error('Upload error', error);
          this.addSongForm.reset();
          this.addSongForm.patchValue({
            songCategory: "",
            songLanguage: ""
          })
          this.imageFile = null;
          this.audioFile = null;
          Swal.fire('Ops!', `Failed to add song!`, 'success');
        }
      );
  }


  fetchMusicData() {
    // console.log(this.tokenService.getUserID());
    this.songService.getSongsByArtistId(this.artistId).subscribe((res)=>{
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
      this.songList = res;
      console.log(res);
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
