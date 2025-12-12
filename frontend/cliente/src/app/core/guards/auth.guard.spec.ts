import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let auth: AuthService;
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let guard: any;

  const routeMock: any = { data: { roles: ['ADMIN'] } };
  const stateMock: any = { url: '/admin' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    auth = TestBed.inject(AuthService);
    guard = TestBed.inject<any>(AuthGuard);

    localStorage.clear();
  });

  it('Debe bloquear si no hay login', () => {

    const result = guard(routeMock, stateMock);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    expect(result).toBeFalse();
  });

  it('Debe permitir si el rol coincide', () => {
    localStorage.setItem('usuario', JSON.stringify({ rol: 'ADMIN' }));

    const result = guard(routeMock, stateMock);

    expect(result).toBeTrue();
  });

});
