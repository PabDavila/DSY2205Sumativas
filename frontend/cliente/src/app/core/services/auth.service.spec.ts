import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';

import { provideHttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  it('Debe logear correctamente', () => {
    service.login('test@test.com', '1234').subscribe();

    const req = httpMock.expectOne('http://localhost:8080/usuarios/login');
    expect(req.request.method).toBe('POST');

    req.flush({ id: 1, rol: 'ADMIN' });

    expect(localStorage.getItem('usuario')).toContain('ADMIN');
  });

  it('Debe eliminar datos en logout', () => {
    localStorage.setItem('usuario', JSON.stringify({ id: 10 }));
    service.logout();
    expect(localStorage.getItem('usuario')).toBeNull();
  });
});
