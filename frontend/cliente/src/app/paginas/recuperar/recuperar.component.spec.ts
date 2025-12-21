import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarComponent } from './recuperar.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('RecuperarComponent', () => {
  let component: RecuperarComponent;
  let fixture: ComponentFixture<RecuperarComponent>;
  let httpMock: HttpTestingController;

  const apiUrl = environment.apiUrl + '/usuarios/recuperar';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RecuperarComponent,
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Debe crear el formulario', () => {
    expect(component.formRecuperar).toBeTruthy();
  });

  it('Debe ser inválido si el correo está vacío', () => {
    component.formRecuperar.setValue({ correo: '' });
    expect(component.formRecuperar.valid).toBeFalse();
  });

  it('Debe enviar recuperación de contraseña', () => {
    component.formRecuperar.setValue({
      correo: 'test@test.cl'
    });

    component.enviar();

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      correo: 'test@test.cl'
    });

    req.flush({});

    expect(component.mensaje)
      .toContain('Si el correo existe');
  });
});
