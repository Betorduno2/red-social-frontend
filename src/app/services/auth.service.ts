// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl =environment.apiUrl;  // Reemplaza con la URL de tu servidor de autenticación

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post(`${this.apiUrl}/auth/login`, loginData).pipe(
      map((response: any) => {
        if (response && response.token) {
          // Almacena el token JWT en localStorage
          console.log('token: ', response.token);
          console.log('token: ', response.userId);
          
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.userId);
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  isAuthenticated(): boolean {
    // Verifica si existe un token en el localStorage y si no ha expirado
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const currentTimestamp = Math.floor(new Date().getTime() / 1000);

        return decodedToken.exp > currentTimestamp;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return false;
      }
    }

    return false;
  }

  logout(): void {
    // Elimina el token al cerrar sesión
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');
    if (token && token.trim() !== '') {
      return token.trim();
    }
  
    // Devuelve null si el token no está presente o es vacío
    return null;
  }
  

  private handleError(error: any) {
    console.error('Error en la solicitud:', error);
    return throwError(error);
  }
}
