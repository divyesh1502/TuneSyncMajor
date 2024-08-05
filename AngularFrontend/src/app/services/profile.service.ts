import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = 'https://localhost:7185/api/Admin/users/get'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getProfileData(userId:number): Observable<any> {
    return this.http.get<any>(`https://localhost:7185/api/Admin/users/get/${userId}`).pipe(
      catchError(error => {
        console.error('Error fetching profile data:', error);
        return throwError('Something went wrong while fetching profile data. Please try again later.');
      })
    );
  }

  updateProfile(userId:number,user: any, imageFile: File): Observable<any> {
    const formData = new FormData();

    // name=Tushar%20Jamadar&username=tusharja&email=t%40test.com&password=Tushar%40123&phone=8794561230&role=1&isApproved=1&isDeleted=0

    const params = new HttpParams()
    .set('name', user.name)
      .set('phone', user.phone)

    formData.append('imageFile', imageFile);
    // https://localhost:7185/api/User/update-profile/6?name=Suyog%20Hajare&phone=7894561234
    return this.http.put<any>(`https://localhost:7185/api/User/update-profile/${userId}`, formData ,{ params: params });
  }
}
