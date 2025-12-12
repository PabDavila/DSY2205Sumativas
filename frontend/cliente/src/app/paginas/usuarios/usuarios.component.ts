import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  api = environment.apiUrl + '/usuarios';

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.http.get<Usuario[]>(this.api).subscribe({
      next: (data) => this.usuarios = data,
      error: () => console.error('Error al cargar usuarios')
    });
  }

  crearUsuario(usuario: any) {
    this.http.post<Usuario>(this.api, usuario).subscribe({
      next: (u) => this.usuarios.push(u),
      error: () => console.error('Error al crear usuario')
    });
  }

  actualizarUsuario(usuario: any) {
    this.http.put<Usuario>(`${this.api}/${usuario.id}`, usuario).subscribe({
      next: (u) => {
        const index = this.usuarios.findIndex(x => x.id === u.id);
        if (index !== -1) this.usuarios[index] = u;
      },
      error: () => console.error('Error al actualizar usuario')
    });
  }

  eliminarUsuario(id: number) {
    this.http.delete(`${this.api}/${id}`).subscribe({
      next: () => this.usuarios = this.usuarios.filter(u => u.id !== id),
      error: () => console.error('Error al eliminar usuario')
    });
  }
}
