import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlaylistServiceService } from '../../../../services/playlist-service.service';
import { SongService } from '../../../../services/song.service';
import { AdminService } from '../../../../services/admin.service';
import { TokenService } from '../../../../services/token.service';
PlaylistServiceService

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css'
})
export class CreateFormComponent implements OnInit{

  coverLetter: string;
  songsCnt: number;
  playlistArr: number[];
  emptySongListMsg: string;
  createPlaylistForm: FormGroup;
  songsList: any;
  artistData: any;

  constructor(private formBuilder: FormBuilder, private playlistService: PlaylistServiceService, private router: Router, private songService: SongService, private adminService: AdminService, private tokenService: TokenService) { }

  ngOnInit() {
    this.coverLetter = "P";
    this.songsCnt = 0;
    this.playlistArr = [];

    this.emptySongListMsg = "";

    this.createPlaylistForm = this.formBuilder.group({
      playlistTitle: ['', Validators.required]
    });

    this.adminService.getAllArtist().subscribe((artistData)=>{
      this.artistData = artistData;
      this.songService.getAllSongs().subscribe((songList)=>{
        // console.log(songList);
        songList.forEach(element => {
          var filePath = element.imageFilePath.split(`\\`);
          element.imageFilePath = filePath[filePath.length - 1];
          element.artistName = this.getNameById(element.artistId)
        });
        console.log(songList);
        
        this.songsList = songList;
      })
    })

  }
  updateCoverLetter(event: any) {
    this.coverLetter = event.target.value[0];
  }

  addRemoveToPlaylist(event: any, id:number){

    // console.log(event.target.name);
    if(event.target.name == "add-circle"){
      event.target.name = "remove-circle";
      this.playlistArr.push(id);
      this.emptySongListMsg = "";
      event.target.classList.add('redColor');
      // console.log(this.playlistArr);

    }else{
      event.target.name = "add-circle";
      this.playlistArr = this.playlistArr.filter(number => number !== id);
      // console.log(this.playlistArr);
      event.target.classList.remove('redColor');
    }
    this.songsCnt = this.playlistArr.length;
    
  }

  onCreatePlaylistSubmit(){
    if(this.playlistArr.length <= 0){
      this.emptySongListMsg = "*Please Select at least one song."
    }else{
      this.emptySongListMsg = "";
      console.log('Form submitted!', this.createPlaylistForm.value);
      console.log(this.playlistArr);
     
      var userId = this.tokenService.getUserID();
      var playlistName= this.createPlaylistForm.get('playlistTitle').value;
      var songIds :string = this.playlistArr.join(',');
      

      this.playlistService.createPlaylist(userId, playlistName, songIds)
      .subscribe((res)=>{
        // alert("New Playlist is created")
        this.router.navigate(['/library']);
        // console.log(res);
      })
      
    }
  }

  // Get Artist name by id
  getNameById(id) {
    const foundObj = this.artistData.find(obj => obj.id === id);
    return foundObj ? foundObj.name : "No object found with that id";
  }

}
