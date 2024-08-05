import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-song-analytics',
  templateUrl: './song-analytics.component.html',
  styleUrls: ['./song-analytics.component.scss'],
})
export class SongAnalyticsComponent  implements OnInit {

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
