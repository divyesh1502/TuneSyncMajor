import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlaylistServiceService } from '../../../../services/playlist-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent {
  allPlaylist : any = [];

  constructor(private playlistService:PlaylistServiceService, private router: Router) { }

  ngOnInit() {
    this.playlistService.getAllPlaylists()
    .subscribe((res)=>{
      this.allPlaylist = res;
      // console.log(this.allPlaylist);
      
    })
  }

  onDeletePlaylist(id:string){

    Swal.fire({
      title: 'Are you sure?',
      text: `Really you want to remove this playlist??`,
      icon: 'info',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm!',
      cancelButtonText: 'Cancel',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.playlistService.deletePlaylist(parseInt(id))
      .subscribe((res)=>{
        Swal.fire("Deleted!", "Playlist deleted successfully", "success");
        this.allPlaylist = this.allPlaylist.filter(item => item.playlist_Id !== id);
        // this.router.navigate(['/library']);
      })
      }
    });

  }
}
