import { TestBed } from '@angular/core/testing';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard (functional)', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  const route = {
    data: { roles: ['ADMIN'] }
  } as unknown as ActivatedRouteSnapshot;

  const state = {
    url: '/admin'
  } as unknown as RouterStateSnapshot;

  beforeEach(() => {
    authService = jasmine.createSpyObj<AuthService>('AuthService', [
      'getUsuario'
    ]);

    router = jasmine.createSpyObj<Router>('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    });
  });

  it('Debe bloquear si no hay login', () => {
    authService.getUsuario.and.returnValue(null);

    const result = AuthGuard(route, state);

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('Debe permitir si el rol coincide', () => {
    authService.getUsuario.and.returnValue({
      rol: 'ADMIN'
    });

    const result = AuthGuard(route, state);

    expect(result).toBeTrue();
  });
});
