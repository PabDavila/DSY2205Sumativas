import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent implements OnInit {

  api = environment.apiUrl + '/usuarios/recuperar';
  mensaje = '';

  formRecuperar: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.formRecuperar = this.fb.group({
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  enviar() {
    const correo = this.formRecuperar.value.correo;

    this.http.post(this.api, { correo })
      .subscribe({
        next: () => this.mensaje = "Si el correo existe, se enviaron instrucciones.",
        error: () => this.mensaje = "Hubo un problema."
      });
  }
}
