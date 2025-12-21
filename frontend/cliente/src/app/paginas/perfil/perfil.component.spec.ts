import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilComponent } from './perfil.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;
  let auth: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    auth = jasmine.createSpyObj<AuthService>('AuthService', ['getUsuario']);

    auth.getUsuario.and.returnValue({
      nombre: 'Juan',
      apellido: 'Pérez',
      correo: 'juan@test.cl'
    });

    await TestBed.configureTestingModule({
      imports: [PerfilComponent, ReactiveFormsModule],
      providers: [{ provide: AuthService, useValue: auth }]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear el formulario', () => {
    expect(component.formPerfil).toBeTruthy();
  });

  it('Debe ser inválido si faltan campos', () => {
    component.formPerfil.patchValue({
      nombre: '',
      apellido: '',
      correo: ''
    });

    expect(component.formPerfil.valid).toBeFalse();
  });

  it('Debe ser válido si los campos están completos', () => {
    component.formPerfil.patchValue({
      nombre: 'Juan',
      apellido: 'Pérez',
      correo: 'juan@test.cl'
    });

    expect(component.formPerfil.valid).toBeTrue();
  });
});
