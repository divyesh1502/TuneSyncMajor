import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-artist-dashboard',
  templateUrl: './artist-dashboard.component.html',
  styleUrls: ['./artist-dashboard.component.scss'],
})
export class ArtistDashboardComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  toggleNavigation(){
    // console.log("toggle Clicked");
    
    let toggle = document.querySelector(".toggle");
    let navigation = document.querySelector(".navigation");
    let main = document.querySelector(".main");

    navigation.classList.toggle("active");
    main.classList.toggle("active");
  }

}
