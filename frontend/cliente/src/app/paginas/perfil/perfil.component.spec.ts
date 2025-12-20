import { TestBed } from '@angular/core/testing';
import { PerfilComponent } from './perfil.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('PerfilComponent', () => {
  let component: PerfilComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilComponent, ReactiveFormsModule]
    }).compileComponents();

    component = TestBed.createComponent(PerfilComponent).componentInstance;
  });

  it('Debe crear el formulario', () => {
    expect(component.formPerfil).toBeTruthy();
  });

  it('Debe ser inválido si faltan campos', () => {
    expect(component.formPerfil.valid).toBeFalse();
  });

  it('Debe ser válido si los campos están completos', () => {
    component.formPerfil.setValue({
      nombre: 'Juan',
      apellido: 'Perez',
      correo: 'a@a.com'
    });

    expect(component.formPerfil.valid).toBeTrue();
  });
});
