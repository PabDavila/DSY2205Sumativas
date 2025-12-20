import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard (functional)', () => {
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  const routeMock: any = { data: { roles: ['ADMIN'] } };
  const stateMock: any = { url: '/admin' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: routerSpy }]
    });
    localStorage.clear();
  });

  it('Debe bloquear si no hay login', () => {
    const result = AuthGuard(routeMock, stateMock);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    expect(result).toBeFalse();
  });

  it('Debe permitir si el rol coincide', () => {
    localStorage.setItem('usuario', JSON.stringify({ rol: 'ADMIN' }));

    const result = AuthGuard(routeMock, stateMock);

    expect(result).toBeTrue();
  });
});
