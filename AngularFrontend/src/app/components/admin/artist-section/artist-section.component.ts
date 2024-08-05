import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-artist-section',
  templateUrl: './artist-section.component.html',
  styleUrls: ['./artist-section.component.scss'],
})
export class ArtistSectionComponent  implements OnInit {

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
