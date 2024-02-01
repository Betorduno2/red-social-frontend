import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  private token: string | null;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.token =  this.authService.getToken();
  }

  getUserById(userId: string): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get(url, { headers });
  }

  updateUser(userData: any): Observable<any> {
    console.log(userData)
    const userId = userData.userId;
    const url = `${this.apiUrl}/users/${userId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.put(url, userData, { headers });
  }
}
