import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Howl } from 'howler';
import { SongService } from '../../services/song.service';
import { ActivatedRoute, Route } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss'],
})
export class MusicPlayerComponent implements OnInit {

  songs: any[] = [];
  currentIndex: number = 0;
  duration = 0;
  currentTime = 0;
  progress = 0;
  currentlyPlaying: any;
  volume = 0.99;
  isLiked: boolean[] = [];
  artistName: string = '';

  songId: number;


  constructor(private http: HttpClient, private songService: SongService, private route: ActivatedRoute, private adminService: AdminService, private tokenService: TokenService) { }

  ngOnInit(): void {


    const id = this.route.snapshot.paramMap.get('id');

    this.songId = parseInt(id);

    this.songService.getSongBySongId(parseInt(id)).subscribe((songs: any) => {
      // console.log(songs);

      // this.songs = songs;
      this.adminService.getArtistById(parseInt(songs.artistId)).subscribe((artistDetails) => {
        this.artistName = artistDetails.name;
      })
      var imageFilePath = songs.imageFilePath.split(`\\`);
      songs.imageFilePath = imageFilePath[imageFilePath.length - 1];
      // console.log(songs.imageFilePath);


      var audioFilePath = songs.audioFilePath.split(`\\`);
      songs.audioFilePath = `assets/audio/` + audioFilePath[audioFilePath.length - 1];

      this.songService.isSongLiked(this.tokenService.getUserID(), this.songId).subscribe((res) => {
        songs.isLiked = res;

        this.isLiked[0] = songs.isLiked;

        this.songs.push(songs)
        // Initialize the liked status for each song
        // this.isLiked = new Array(this.songs.length).fill(false);
        console.log(songs);
        this.loadSong();
      })


    });

    // this.songs = this.data;
  }

  loadSong() {
    const song = this.songs[this.currentIndex];
    if (this.currentlyPlaying) {
      this.currentlyPlaying.stop();
    }
    this.currentlyPlaying = new Howl({
      src: [song.audioFilePath],
      autoplay: true,
      volume: this.volume,
      onplay: () => {
        // console.log('Playing', song.songName);
        setInterval(() => {
          this.currentTime = this.currentlyPlaying?.seek() ?? 0;
          this.progress = (this.currentTime / this.duration) * 100;
        }, 1000);
      },
      onend: () => {
        // console.log('Finished playing', song.songName);
        this.playNext();
      }
    });

    // Create an audio element to preload the duration
    const audioElement = new Audio(song.audioFilePath);
    audioElement.addEventListener('loadedmetadata', () => {
      this.duration = audioElement.duration;
      // console.log('Duration:', this.duration);
    });

    this.currentlyPlaying.play();
  }



  seekTo(event: any) {
    const value = event.target.value;
    if (this.currentlyPlaying) {
      const newPosition = parseFloat(value) * (this.duration || 1) / 100;
      this.currentlyPlaying.seek(newPosition);
    }
  }

  setVolume(event: any) {
    const value = event.target.value;
    this.volume = parseFloat(value) / 100;
    if (this.currentlyPlaying) {
      this.currentlyPlaying.volume(this.volume);
    }
  }

  playAudio() {
    if (this.currentlyPlaying && !this.currentlyPlaying.playing()) {
      this.currentlyPlaying.play();
    } else if (this.currentlyPlaying) {
      this.currentlyPlaying.pause();
    }
  }

  playNext() {
    this.currentIndex = (this.currentIndex + 1) % this.songs.length;
    this.triggerSlideAnimation();
  }

  playPrevious() {
    this.currentIndex = (this.currentIndex - 1 + this.songs.length) % this.songs.length;
    this.triggerSlideAnimation();
  }

  toggleLike(index: number) {
    this.isLiked[index] = !this.isLiked[index];

    console.log(this.isLiked);

    if (this.isLiked[0] == true) {
      const body = {
        "userId": this.tokenService.getUserID(),
        "songId": this.songId
      }
      this.songService.addToFav(body).subscribe((res) => {
        console.log(res.msg);
      })
    } else if (this.isLiked[0] == false) {
      this.songService.removeFromFav(this.tokenService.getUserID(), this.songId).subscribe((res) => {
        console.log(res.msg);
      })
    }

  }


  private triggerSlideAnimation() {

    setTimeout(() => {
      const trackArt = document.querySelector('.track-art');
      if (trackArt) {
        trackArt.classList.add('animate');
        setTimeout(() => {
          trackArt.classList.remove('animate');
          this.loadSong();
        }, 500);
      }
    }, 100);
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  toggleNavigation() {
    // console.log("toggle Clicked");

    let toggle = document.querySelector(".toggle");
    let navigation = document.querySelector(".navigation");
    let main = document.querySelector(".main");

    navigation.classList.toggle("active");
    main.classList.toggle("active");
  }

  isUser() {
    if (this.tokenService.isAuthenticated() && this.tokenService.getUserRole() === 1) {
      return true;
    } else {
      return false;
    }
  }

}
