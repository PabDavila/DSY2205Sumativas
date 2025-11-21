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

  login(correo: string, password: string) {
  return this.http.post(`${this.api}/login`, { correo, password }).pipe(
    tap((usuario: any) => {
      localStorage.setItem('usuario', JSON.stringify(usuario));
    })
  );
}


logout() {
  localStorage.removeItem('usuario');
}

  isAuthenticated(): boolean {
    return localStorage.getItem('usuario') != null;
  }

  getUsuario() {
  const u = localStorage.getItem('usuario');
  return u ? JSON.parse(u) : null;
}

  getRol(): string | null {
    return localStorage.getItem('rol');
  }
}
