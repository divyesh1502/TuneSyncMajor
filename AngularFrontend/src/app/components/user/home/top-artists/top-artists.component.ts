import { Component } from '@angular/core';
import { SongService } from '../../../../services/song.service';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-top-artists',
  templateUrl: './top-artists.component.html',
  styleUrl: './top-artists.component.css'
})
export class TopArtistsComponent {
  artistData: any = []
  constructor(private songService: SongService, private adminService: AdminService){}
  ngOnInit(): void {
    this.loadArtist();
  }

  loadArtist(){
    this.adminService.getAllArtist().subscribe((res)=>{

      res.forEach(element => {
        var imageFilePath = element.profileImage.split(`\\`);
        element.profileImage = `assets/profileImages/` + imageFilePath[imageFilePath.length - 1];
      });

      if(res.length > 4){
        this.artistData = res.slice(0, 4);
      }else{
        this.artistData = res;
      }
      
    })
  }

}
