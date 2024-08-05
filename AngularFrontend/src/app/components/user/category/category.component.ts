import { Component, OnInit } from '@angular/core';
import { SongService } from '../../../services/song.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{

  categories: string[];
  constructor(private songService: SongService) { }

  ngOnInit() {
    this.songService.getAllCategory().subscribe(categories => {
      this.categories = categories;
    });
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
