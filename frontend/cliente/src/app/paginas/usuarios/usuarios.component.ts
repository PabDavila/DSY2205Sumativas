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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.http.get<Usuario[]>(this.api).subscribe({
      next: (data) => this.usuarios = data,
      error: () => console.log('Error al cargar usuarios')
    });
  }

  eliminar(id: number) {
    if (!confirm('¿Seguro que deseas eliminar este usuario?')) return;

    this.http.delete(`${this.api}/${id}`).subscribe({
      next: () => this.listarUsuarios(),
      error: () => alert('No se pudo eliminar el usuario')
    });
  }

}
