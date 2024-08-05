import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistServiceService {

  private apiUrl = 'https://localhost:7185/api/Playlist';

  constructor(private http: HttpClient) { }

  getAllPlaylists(): Observable<any> {
    return this.http.get<any>(this.apiUrl); 
  }

  getPlaylistById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  createPlaylist(userId: number, playlistName: string, songIds: string): Observable<any> {
    const params = new HttpParams()
      .set('UserId', userId.toString())
      .set('playlistName', playlistName)
      .set('songIds', songIds);

    return this.http.post<any>(this.apiUrl, null, { params: params });
  }

  updatePlaylist(id: number, songIds: string): Observable<any> {
    
    const url = `${this.apiUrl}/${id}`;
    const params = new HttpParams()
    .set('songIds', songIds);

    return this.http.put<any>(url, null, { params: params });
  }

  deletePlaylist(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }

}
