import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let auth: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        AuthService,
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') }
        }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    auth = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
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
    spyOn(auth, 'login').and.callThrough();

    component.formLogin.setValue({ correo: 'a@a.com', password: '1234' });
    component.login();

    expect(auth.login).toHaveBeenCalled();
  });
});
