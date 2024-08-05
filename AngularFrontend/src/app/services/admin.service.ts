import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'https://localhost:7185/api/Admin';

  constructor(private http: HttpClient) { }

  getArtistById(artistId:number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/artists/get/${artistId}`);
  }
  getUserById(userId:number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/get/${userId}`);
  }
  getAllArtist(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/artists/getall`);
  }
}
