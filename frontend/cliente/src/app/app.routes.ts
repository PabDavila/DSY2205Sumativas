import { Routes } from '@angular/router';

import { LoginComponent } from './paginas/login/login.component';
import { RecuperarComponent } from './paginas/recuperar/recuperar.component';
import { PerfilComponent } from './paginas/perfil/perfil.component';
import { UsuariosComponent } from './paginas/usuarios/usuarios.component';
import { ResultadosComponent } from './paginas/resultados/resultados.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'recuperar', component: RecuperarComponent },

  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },

  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },

  {
    path: 'resultados',
    component: ResultadosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN', 'ANALISTA'] }
  },

  { path: '**', redirectTo: 'login' }

];
