import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RecuperarComponent } from './recuperar.component';
import { environment } from '../../../environments/environment';

describe('RecuperarComponent', () => {

  let component: RecuperarComponent;
  let httpMock: HttpTestingController;

  const api = environment.apiUrl + '/usuarios/recuperar';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [RecuperarComponent]
    });

    component = TestBed.inject(RecuperarComponent);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('Debe enviar recuperación de contraseña', () => {
    component.formRecuperar.setValue({ correo: 'test@mail.com' });

    component.enviar();

    const req = httpMock.expectOne(api);
    expect(req.request.method).toBe('POST');

    req.flush({});

    expect(component.mensaje).toContain('Si el correo existe');
  });

});
