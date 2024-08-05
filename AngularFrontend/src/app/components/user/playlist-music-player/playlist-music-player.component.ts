import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Howl } from 'howler';
import { SongService } from '../../../services/song.service';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { PlaylistServiceService } from '../../../services/playlist-service.service';

@Component({
  selector: 'app-playlist-music-player',
  templateUrl: './playlist-music-player.component.html',
  styleUrl: './playlist-music-player.component.css'
})
export class PlaylistMusicPlayerComponent {

  
  songs: any[] = [];
  currentIndex: number = 0;
  duration = 0;
  currentTime = 0;
  progress = 0;
  currentlyPlaying: any;
  volume = 0.99; // Default volume
  isLiked: boolean[] = []; // Array to track liked status of songs
  artistName: string = '';
  playlistDetails: any = {};

  songListData: any = []
  sortedSongList: any = [];
  artistData: any;


  constructor(private http: HttpClient, private songService: SongService, private route: ActivatedRoute, private adminService: AdminService, private playlistService: PlaylistServiceService) { }


  ngOnInit(): void {

    const id: number = parseInt(this.route.snapshot.paramMap.get('id'));
    // console.log('ID:', id);


    this.adminService.getAllArtist().subscribe((artistData)=>{
      this.artistData = artistData;
      this.songService.getAllSongs().subscribe((songList) => {
        // console.log(songList);
        songList.forEach(element => {
          var filePath = element.imageFilePath.split(`\\`);
          element.imageFilePath = filePath[filePath.length - 1];
          var audioFilePath = element.audioFilePath.split(`\\`);
          element.audioFilePath = `assets/audio/`+audioFilePath[audioFilePath.length - 1];
          
          element.artistName = this.getNameById(element.artistId)
        });
        console.log(songList);
  
        this.songListData = songList;
        this.loadPlaylistDetails();
      })
    })


    // const id = this.route.snapshot.paramMap.get('id');

    // console.log(id);

    // this.songService.getSongs().subscribe(songs => {
    //   console.log(songs);
      
    //   this.songs = songs;
    //   // Initialize the liked status for each song
    //   this.isLiked = new Array(this.songs.length).fill(false);
      
    //   this.loadSong();
    // });

    

    

    // this.songs = this.data;
  }

  loadSong() {
    const song = this.songs[this.currentIndex];
    if (this.currentlyPlaying) {
      this.currentlyPlaying.stop(); // Stop the currently playing song
    }
    this.currentlyPlaying = new Howl({
      src: [song.audioFilePath],
      autoplay: true, // Set autoplay to true
      volume: this.volume, // Set initial volume
      onplay: () => {
        console.log('Playing', song.songName);
        setInterval(() => {
          this.currentTime = this.currentlyPlaying?.seek() ?? 0; // Update the current playback time
          this.progress = (this.currentTime / this.duration) * 100; // Update the progress percentage
        }, 1000); // Update every second
      },
      onend: () => {
        console.log('Finished playing', song.songName);
        this.playNext(); // Automatically play the next song when the current song ends
      }
    });

    // Create an audio element to preload the duration
    const audioElement = new Audio(song.audioFilePath);
    audioElement.addEventListener('loadedmetadata', () => {
      this.duration = audioElement.duration; // Update the duration of the current song
      console.log('Duration:', this.duration);
    });

    this.currentlyPlaying.play(); // Play the song
  }

  

  seekTo(event: any) {
    const value = event.target.value;
    if (this.currentlyPlaying) {
      const newPosition = parseFloat(value) * (this.duration || 1) / 100; // Add a default duration value to avoid division by zero
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
      this.currentlyPlaying.play(); // Play the audio if currently paused or stopped
    } else if (this.currentlyPlaying) {
      this.currentlyPlaying.pause(); // Pause the audio if currently playing
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
    // You can add logic to update the backend with liked status if required
  }
  
  addToPlaylist() {
    // Implement the functionality to add the current song to the playlist
    console.log("Song added to playlist!");
}


  private triggerSlideAnimation() {
    // Add a small delay to allow the animation to reset
    setTimeout(() => {
      const trackArt = document.querySelector('.track-art');
      if (trackArt) {
        trackArt.classList.add('animate');
        setTimeout(() => {
          trackArt.classList.remove('animate');
          this.loadSong();
        }, 500); // Duration of the animation
      }
    }, 100); // Delay before starting the animation
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Format time as mm:ss
  }

  toggleNavigation(){
    // console.log("toggle Clicked");
    
    let toggle = document.querySelector(".toggle");
    let navigation = document.querySelector(".navigation");
    let main = document.querySelector(".main");

    navigation.classList.toggle("active");
    main.classList.toggle("active");
  }

  loadPlaylistDetails(){
    this.sortedSongList = []
    const id: number = parseInt(this.route.snapshot.paramMap.get('id'));
    this.playlistService.getPlaylistById(id).subscribe((res) => {

      // console.log(res);
      res.songs_in_List = res.songs_in_List.split(',');

      // console.log(res);

      this.playlistDetails = res;
      this.playlistDetails.songs_in_List.forEach(element => {
        this.getSortedSongList(parseInt(element));

      });
      this.songs = this.sortedSongList;
      
      this.loadSong();
      console.log(this.sortedSongList);

    })
  }
  getNameById(id) {
    const foundObj = this.artistData.find(obj => obj.id === id);
    return foundObj ? foundObj.name : "No object found with that id";
  }
  getSortedSongList(id){
    const foundObj = this.songListData.find(obj => obj.id === id);
    this.sortedSongList.push(foundObj);
  }

}
