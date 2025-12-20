import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let auth: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    auth = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: auth },
        { provide: Router, useValue: { navigate: jasmine.createSpy() } }
      ]
    }).compileComponents();

    component = TestBed.createComponent(LoginComponent).componentInstance;
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Formulario inválido si está vacío', () => {
    expect(component.formLogin.valid).toBeFalse();
  });

  it('Debe mostrar mensaje si está vacío al intentar login', () => {
    component.login();
    expect(component.mensajeError).toBeTruthy();
  });

  it('Debe llamar al servicio login si el formulario es válido', () => {
    auth.login.and.returnValue(of(null));

    component.formLogin.setValue({
      correo: 'a@a.com',
      password: '1234'
    });

    component.login();

    expect(auth.login).toHaveBeenCalled();
  });
});
