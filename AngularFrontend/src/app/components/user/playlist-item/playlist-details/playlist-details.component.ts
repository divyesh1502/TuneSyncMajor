import { Component, OnInit } from '@angular/core';
import { PlaylistServiceService } from '../../../../services/playlist-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from '../../../../services/song.service';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-playlist-details',
  templateUrl: './playlist-details.component.html',
  styleUrl: './playlist-details.component.css'
})
export class PlaylistDetailsComponent implements OnInit {
  playlistDetails: any = {};

  songListData: any = []
  sortedSongList: any = [];
  artistData: any;

  constructor(private playlistService: PlaylistServiceService, private route: ActivatedRoute, private router: Router, private songService: SongService, private adminService:AdminService) { }

  ngOnInit() {
    const id: number = parseInt(this.route.snapshot.paramMap.get('id'));
    // console.log('ID:', id);


    this.adminService.getAllArtist().subscribe((artistData)=>{
      this.artistData = artistData;
      this.songService.getAllSongs().subscribe((songList) => {
        // console.log(songList);
        songList.forEach(element => {
          var filePath = element.imageFilePath.split(`\\`);
          element.imageFilePath = filePath[filePath.length - 1];
          element.artistName = this.getNameById(element.artistId)
        });
        console.log(songList);
  
        this.songListData = songList;
        this.loadPlaylistDetails();
      })
    })


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
      console.log(this.sortedSongList);

    })
  }

  removeFromPlaylist(id: number) {
    console.log(id);
    if (this.playlistDetails.songs_in_List.length == 1) {

      if (confirm('This is last song of your playlist. If it will be deleted then whole playlist will be deleted. Are you till want to delete it?')) {
        // console.log("Delete it");
        this.playlistService.deletePlaylist(parseInt(this.playlistDetails.playlist_Id))
          .subscribe((res) => {
            alert("Playlist deleted successfully")
            this.router.navigate(['/library']);
          })
      }

    } else {
      var tempArr = this.playlistDetails.songs_in_List.filter(item => item != id);

      console.log(tempArr);
      
      var songIds: string = tempArr.join(',');

      console.log(songIds);

      this.playlistService.updatePlaylist(parseInt(this.playlistDetails.playlist_Id), songIds)
        .subscribe((res) => {
          console.log(res);
          alert(res.msg)
          this.playlistDetails.songs_in_List = this.playlistDetails.songs_in_List.filter(item => item !== id);
          this.loadPlaylistDetails()


        })
    }


  }
  // Get Artist name by id
  getNameById(id) {
    const foundObj = this.artistData.find(obj => obj.id === id);
    return foundObj ? foundObj.name : "No object found with that id";
  }
  getSortedSongList(id){
    const foundObj = this.songListData.find(obj => obj.id === id);
    this.sortedSongList.push(foundObj);
  }
}
