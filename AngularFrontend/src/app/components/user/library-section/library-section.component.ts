import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-library-section',
  templateUrl: './library-section.component.html',
  styleUrl: './library-section.component.css'
})
export class LibrarySectionComponent implements OnInit{
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
