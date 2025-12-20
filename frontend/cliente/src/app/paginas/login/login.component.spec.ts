import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let auth: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule
      ],
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') }
        }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    auth = TestBed.inject(AuthService);
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Formulario inválido si está vacío', () => {
    expect(component.formLogin.valid).toBeFalse();
  });

  it('Debe mostrar mensaje si está vacío al intentar login', () => {
    component.login();
    expect(component.mensajeError).toBe('Todos los campos son obligatorios');
  });

  it('Debe llamar al servicio login si el formulario es válido', () => {
    spyOn(auth, 'login').and.returnValue(of(null));

    component.formLogin.setValue({
      correo: 'a@a.com',
      password: '1234'
    });

    component.login();

    expect(auth.login).toHaveBeenCalled();
  });
});
