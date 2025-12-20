import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    localStorage.clear();
  });

  it('Debe logear correctamente', () => {
  spyOn(service, 'login').and.callThrough();

  service.login('test@test.com', '1234');

  expect(service.login).toHaveBeenCalledWith('test@test.com', '1234');
});


  it('Debe eliminar datos en logout', () => {
    localStorage.setItem('usuario', JSON.stringify({ correo: 'a@a.com' }));

    service.logout();

    expect(localStorage.getItem('usuario')).toBeNull();
  });
});
