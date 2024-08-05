import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-song-card-item',
  templateUrl: './song-card-item.component.html',
  styleUrl: './song-card-item.component.css'
})
export class SongCardItemComponent implements OnInit{
  musicData: any[] = [];
  constructor(private http: HttpClient) { }
  ngOnInit():void { 
    this.fetchMusicData();
  }

  fetchMusicData() {
    // this.http.get<any[]>('https://localhost:7185/api/User/getall-Songs')
    //   .subscribe(
    //     (data) => {
    //       console.log(data);
    //       this.musicData = data; // Assuming your API returns an array of music data
    //     },
    //     (error) => {
    //       console.log('Error fetching music data:', error);
    //     }
    //   );
  }
}

