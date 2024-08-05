import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable,of  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private apiUrl = 'https://localhost:7185/api';

  constructor(private http: HttpClient) { }

  isLoggedIn = false;

  login(user: any): Observable<any> {
    this.isLoggedIn = true;
    return this.http.post(`${this.apiUrl}/Login/login`, user);
  }

  register(user: any, imageFile: File): Observable<any> {

    const formData = new FormData();


    const params = new HttpParams()
      .set('name', user.name)
      .set('username', user.username)
      .set('email', user.email)
      .set('password', user.password)
      .set('phone', user.phone)
      .set('role', user.role)
      .set('isApproved', user.isApproved)
      .set('isDeleted', 0);

    formData.append('imageFile', imageFile);

    return this.http.post(`${this.apiUrl}/Register/register`, formData ,{ params: params });
  }
  
}
