import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  
  form = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  get correo() { return this.form.get('correo'); }
  get password() { return this.form.get('password'); }

  login() {
    if (this.form.invalid) return;

    this.auth.login(this.form.value).subscribe({
      next: (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        this.router.navigate(['/laboratorios']);
      },
      error: () => alert("Credenciales incorrectas")
    });
  }
}
