// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [
  { path: 'registro', loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroModule) },
  { path: 'inicio-sesion', loadChildren: () => import('./pages/inicio-sesion/inicio-sesion.module').then(m => m.InicioSesionModule) },
  { path: 'muro', loadChildren: () => import('./pages/muro/muro.module').then(m => m.MuroModule), canActivate: [AuthGuard] },
  { path: 'perfil', loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilModule), canActivate: [AuthGuard] },
  { path: '', redirectTo: '/inicio-sesion', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
