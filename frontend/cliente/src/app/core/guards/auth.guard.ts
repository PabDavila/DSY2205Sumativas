import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {

  const auth = inject(AuthService);
  const router = inject(Router);

  const usuario = auth.getUsuario();

  if (!usuario) {
    router.navigate(['/login']);
    return false;
  }

  const rolesPermitidos = route.data['roles'];

  if (rolesPermitidos && !rolesPermitidos.includes(usuario.rol)) {
    if (usuario.rol === 'ANALISTA') {
      router.navigate(['/resultados']);
    } else {
      router.navigate(['/login']);
    }
    return false;
  }

  return true;
};
