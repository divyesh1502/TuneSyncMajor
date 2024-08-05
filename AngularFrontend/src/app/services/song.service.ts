import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private apiUrl = 'https://localhost:7185/api';

  constructor(private http: HttpClient) { }

  getAllSongs(): Observable<any[]> {
    const url = `${this.apiUrl}/User/getall-Songs`;
    return this.http.get<any[]>(url);
  }

  insertSong(name: string, category: string, language: string, artistId: number, imageFile: File, audioFile: File): Observable<any> {
    const formData = new FormData();

    const params = new HttpParams()
      .set('category', category)
      .set('songName', name)
      .set('language', language)
      .set('artistId', artistId);

    formData.append('imageFile', imageFile);
    formData.append('audioFile', audioFile);
    return this.http.post<any>("https://localhost:7185/api/Artist/songs/insert", formData,{ params: params });
  }

  addToFav(body: any): Observable<any> {
    return this.http.post<any>("https://localhost:7185/api/User/AddToFav", body);
  }
  removeFromFav(userId:number, songId:number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7185/api/User/RemoveFromFav/${userId}/${songId}`);
  }
  isSongLiked(userId:number, songId:number): Observable<any> {
    return this.http.get<any>(`https://localhost:7185/api/User/IsSongLiked?userId=${userId}&songId=${songId}`);
  }
  getFavSongList(userId:number):Observable<any> {
    return this.http.get<any>(`https://localhost:7185/api/User/FavList/${userId}`);
  }



  getSongsByArtistId(artistId: number): Observable<any[]> {
    const url = `https://localhost:7185/api/Artist/get-songs-by-artist/${artistId}`;
    return this.http.get<any[]>(url);
  }

  getLikedSongsByUserId(userId: number): Observable<any[]> {
    const url = `${this.apiUrl}/liked-songs/${userId}`;
    return this.http.get<any[]>(url);
  }
  getSongBySongId(songId: number): Observable<any[]> {
    const url = `${this.apiUrl}/User/getSongs/${songId}`;
    return this.http.get<any[]>(url);
  }

  getSongTableLength(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/Admin/get-all-songs-length`);
  }

  getUserCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/Admin/GetUserCount`);
  }

  getArtistCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/Admin/GetArtistCount`);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Admin/users/getall`);
  }

  softDeleteUser(userId: number): Observable<any> {
    return this.http.delete<any[]>(`${this.apiUrl}/Admin/delete-artist-profile/${userId}`, {});
  }

  getPendingUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Admin/GetPendingUsers`);
  }

  approveArtist(userId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/Admin/approveartist/${userId}`, {});
  }

  rejectArtist(userId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/Admin/rejectartist/${userId}`, {});
  }

  getAllArtist(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/Admin/artists/getall`);
  }

  updateUserStatus(userId: number, isApproved: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/Admin/updateUserApproval/${userId}/${isApproved}`, {});
  }

  getArtistWithSongs(artistId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/Admin/artists/get/${artistId}`);
  }

  getSongs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/User/getall-Songs`);
  }

  getSongById(songId: number): Observable<any> {
    const url = `${this.apiUrl}/User/getSongs/${songId}`;
    return this.http.get<Song[]>(url);
  }
  
  getTopRatedSongs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/User/toprated`);
  }

  getPopularSongs(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/User/topliked`);
  }

  removeSong(songId:number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Artist/delete-song/${songId}`);
  }

  getSongByCategory(songname: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/User/get-songs-by-category/${songname}`)
  }

  getAllCategory(): Observable<any>{
    return this.http.get<any> (`${this.apiUrl}/User/categories`)
  }

  updatePassword(userId: number, oldPassword: string, newPassword: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Artist/updatePassword/${userId}`, { oldPassword, newPassword });
  }
}


export class Song {
  id: number;
  title: string;
  artist: string;
  coverImageUrl: string;
  ratings: number;
  category: string;
  language: string;
  audioUrl: string;

  constructor(
    id: number,
    title: string,
    artist: string,
    coverImageUrl: string,
    ratings: number,
    category: string,
    language: string,
    audioUrl: string
  ) {
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.coverImageUrl = coverImageUrl;
    this.ratings = ratings;
    this.category = category;
    this.language = language;
    this.audioUrl = audioUrl;
  }
}

