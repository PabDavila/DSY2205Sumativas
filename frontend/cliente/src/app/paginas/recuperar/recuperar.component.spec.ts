import { TestBed } from '@angular/core/testing';
import { RecuperarComponent } from './recuperar.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('RecuperarComponent', () => {
  let component: RecuperarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RecuperarComponent,
        ReactiveFormsModule
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(RecuperarComponent);
    component = fixture.componentInstance;
  });

  it('Debe crear el formulario', () => {
    const form = (component as any).form || (component as any).formRecuperar;
    expect(form).toBeTruthy();
  });

  it('Debe ser inválido si el correo está vacío', () => {
    const form = (component as any).form || (component as any).formRecuperar;
    form.reset();
    expect(form.valid).toBeFalse();
  });

  it('Debe enviar recuperación de contraseña', () => {
    const form = (component as any).form || (component as any).formRecuperar;
    form.setValue({ correo: 'test@test.com' });
    expect(form.valid).toBeTrue();
  });
});
