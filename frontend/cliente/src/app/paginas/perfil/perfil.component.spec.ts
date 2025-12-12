import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil.component';

describe('PerfilComponent', () => {

  let component: PerfilComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [PerfilComponent]
    });

    component = TestBed.inject(PerfilComponent);
  });

  it('Debe crear el formulario', () => {
    expect(component.formPerfil).toBeTruthy();
  });

  it('Debe ser inválido si faltan campos', () => {
    component.formPerfil.setValue({
      nombre: '',
      correo: ''
    });

    expect(component.formPerfil.invalid).toBeTrue();
  });

  it('Debe ser válido si los campos están completos', () => {
    component.formPerfil.setValue({
      nombre: 'Juan',
      correo: 'test@mail.com'
    });

    expect(component.formPerfil.valid).toBeTrue();
  });

});
