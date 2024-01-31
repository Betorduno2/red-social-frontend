import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { InicioSesionComponent } from './pages/inicio-sesion/inicio-sesion.component';
import { MenuLateralComponent } from './pages/menu-lateral/menu-lateral.component';
import { MuroComponent } from './pages/muro/muro.component';
import { TarjetaPublicacionComponent } from './components/tarjeta-publicacion/tarjeta-publicacion.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    InicioSesionComponent,
    MenuLateralComponent,
    MuroComponent,
    TarjetaPublicacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
