import { Component, OnInit } from '@angular/core';
import { SongService } from '../../../../services/song.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss'],
})
export class ArtistListComponent  implements OnInit {

  artists: any[];

  constructor(private songService: SongService) { }

  ngOnInit() {
    this.getAllartists();
  }

  getAllartists(): void {
    this.songService.getAllArtist().subscribe(artists => {
      artists.forEach(element => {
        
        var imageFilePath = element.profileImage.split(`\\`);
        element.profileImage = `assets/profileImages/` + imageFilePath[imageFilePath.length - 1];

        this.songService.getSongsByArtistId(element.id).subscribe((res)=>{
          element.artistSongCnt = res.length;
        })
      });
      this.artists = artists;
      console.log(artists);
    });
  }

  softDeleteUser(userId: number): void {

    Swal.fire({
      title: 'Are you sure?',
      text: `Really you want to remove this artist??`,
      icon: 'info',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm!',
      cancelButtonText: 'Cancel',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.songService.softDeleteUser(userId).subscribe(() => {
          this.getAllartists();
          this.artists = this.artists.filter(user => user.id !== userId);
        });
      }
    });


    
  }

  updateUserStatus(userId: number, isAprroved: number){
    this.songService.updateUserStatus(userId, isAprroved).subscribe(() => {
      this.getAllartists();
    });
  }

}
