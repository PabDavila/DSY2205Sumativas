import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  api = environment.apiUrl + '/usuarios';
  mensaje = '';

  formPerfil: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const user = this.auth.getUsuario();

    this.formPerfil = this.fb.group({
      nombre: [user.nombre, Validators.required],
      apellido: [user.apellido, Validators.required],
      correo: [user.correo, [Validators.required, Validators.email]],
    });
  }

  guardar() {
    const user = this.auth.getUsuario();

    this.http.put(`${this.api}/${user.id}`, this.formPerfil.value)
      .subscribe({
        next: () => {
          this.mensaje = "Cambios guardados correctamente";
          localStorage.setItem("usuario", JSON.stringify({
            ...user,
            ...this.formPerfil.value
          }));
        },
        error: () => this.mensaje = "Error al guardar cambios"
      });
  }

}
