import { TestBed } from '@angular/core/testing';
import { RecuperarComponent } from './recuperar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { of } from 'rxjs';

describe('RecuperarComponent', () => {
  let component: RecuperarComponent;
  let authSpy: any; // 👈 CLAVE

  beforeEach(async () => {
    authSpy = jasmine.createSpyObj('AuthService', ['recuperar']);
    authSpy.recuperar.and.returnValue(of(true));

    await TestBed.configureTestingModule({
      imports: [
        RecuperarComponent,
        ReactiveFormsModule
      ],
      providers: [
        { provide: AuthService, useValue: authSpy }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(RecuperarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear el formulario', () => {
    expect(component.formRecuperar).toBeTruthy();
  });

  it('Debe ser inválido si el correo está vacío', () => {
    component.formRecuperar.setValue({
      correo: ''
    });

    expect(component.formRecuperar.valid).toBeFalse();
  });

  it('Debe enviar recuperación de contraseña', () => {
    component.formRecuperar.setValue({
      correo: 'test@correo.cl'
    });

    component.enviar();

    expect(authSpy.recuperar).toHaveBeenCalled();
  });
});
