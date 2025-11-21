import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mensajeError = '';

  formLogin: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formLogin = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    if (this.formLogin.invalid) {
      this.mensajeError = 'Todos los campos son obligatorios';
      return;
    }

    const { correo, password } = this.formLogin.value;

    this.auth.login(correo, password).subscribe({
      next: (u) => {
        if (!u) {
          this.mensajeError = 'Credenciales incorrectas';
          return;
        }

        if (u.rol === 'ADMIN') {
          this.router.navigate(['/usuarios']);
        } else {
          this.router.navigate(['/resultados']);
        }
      },
      error: () => {
        this.mensajeError = 'Usuario o contraseña incorrectos';
      }
    });
  }
}
