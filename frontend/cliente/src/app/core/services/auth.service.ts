import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = environment.apiUrl + '/usuarios';

  constructor(private http: HttpClient) {}

  login(correo: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.api}/login`, { correo, password })
      .pipe(
        tap(user => {
          if (user) {
            localStorage.setItem('usuario', JSON.stringify(user));
            localStorage.setItem('rol', user.rol || 'USER');
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('usuario') !== null;
  }

  getRol(): string | null {
    return localStorage.getItem('rol');
  }
}
