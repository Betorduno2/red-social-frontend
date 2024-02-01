import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service'; // Asegúrate de importar AuthService

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = environment.apiUrl; // Ajusta esto según tu configuración

  constructor(private http: HttpClient, private authService: AuthService) {}

  createPost(postData: any): Observable<any> {
    const url = `${this.apiUrl}/posts`; // Ajusta la URL según tu API

    // Obtiene el token de AuthService
    const token = this.authService.getToken();

    // Agrega el token al encabezado de la solicitud
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    // Realiza la solicitud HTTP con los encabezados
    return this.http.post(url, postData, { headers });
  }

  getAllPosts(): Observable<any[]> {
    // Obtén el token del servicio de autenticación
    const token = this.authService.getToken();

    // Agrega el token a las cabeceras de la solicitud
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Realiza la solicitud HTTP con las cabeceras que contienen el token
    return this.http.get<any[]>(`${this.apiUrl}/posts`, { headers });
  }
}
