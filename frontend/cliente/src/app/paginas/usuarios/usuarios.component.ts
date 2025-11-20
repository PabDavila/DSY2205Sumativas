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
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.http.get<Usuario[]>(this.api).subscribe(data => {
      this.usuarios = data;
    });
  }

  eliminar(id: number) {
    if (!confirm("¿Eliminar usuario?")) return;
    
    this.http.delete(`${this.api}/${id}`).subscribe(() => {
      this.cargarUsuarios();
    });
  }
}
