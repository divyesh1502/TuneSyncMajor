import { Component, OnInit } from '@angular/core';
import { SongService } from '../../../services/song.service';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.css'
})
export class ArtistsComponent implements OnInit{

  artistData:any = []
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

      this.artistData = res;
      
    })
  }

  toggleNavigation(){
    // console.log("toggle Clicked");
    
    let toggle = document.querySelector(".toggle");
    let navigation = document.querySelector(".navigation");
    let main = document.querySelector(".main");

    navigation.classList.toggle("active");
    main.classList.toggle("active");
  }
}
