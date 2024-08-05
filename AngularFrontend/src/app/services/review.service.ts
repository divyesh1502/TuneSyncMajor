import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiUrl = 'https://localhost:7185/api';

  constructor(private http: HttpClient) { }

  addRatings(body:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/User/add-ratings`, body);
  }
  // /User/get-rating-of-a-song/12
  getReviewOfSong(songId:number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/User/get-rating-of-a-song/${songId}`);
  }

  // 
  getAverageRatings(songId:number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Artist/average-rating/${songId}`);
  }
}
