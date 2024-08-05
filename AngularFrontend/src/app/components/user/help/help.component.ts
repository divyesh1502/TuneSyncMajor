import { Component } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrl: './help.component.css'
})
export class HelpComponent {
  searchVisible: boolean = false;
  playVisible: boolean = false;
  playlistVisible: boolean = false;
  contactVisible: boolean = false;

  constructor() { }

  toggleNavigation() {
    let toggle = document.querySelector(".toggle");
    let navigation = document.querySelector(".navigation");
    let main = document.querySelector(".main");

    navigation.classList.toggle("active");
    main.classList.toggle("active");
  }

  toggleAnswer(id: string) {
    switch (id) {
      case 'search':
        this.searchVisible = !this.searchVisible;
        break;
      case 'play':
        this.playVisible = !this.playVisible;
        break;
      case 'playlist':
        this.playlistVisible = !this.playlistVisible;
        break;
      case 'contact':
        this.contactVisible = !this.contactVisible;
        break;
      default:
        break;
    }
  }
}
