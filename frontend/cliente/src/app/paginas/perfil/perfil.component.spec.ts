import { TestBed } from '@angular/core/testing';
import { PerfilComponent } from './perfil.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('PerfilComponent', () => {
  let component: PerfilComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PerfilComponent,
        ReactiveFormsModule
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear el formulario', () => {
    expect(component.formPerfil).toBeTruthy();
  });

  it('Debe ser inválido si faltan campos', () => {
    component.formPerfil.setValue({
      nombre: '',
      apellido: '',
      correo: ''
    });

    expect(component.formPerfil.valid).toBeFalse();
  });

  it('Debe ser válido si los campos están completos', () => {
    component.formPerfil.setValue({
      nombre: 'Juan',
      apellido: 'Perez',
      correo: 'juan@correo.cl'
    });

    expect(component.formPerfil.valid).toBeTrue();
  });
});
