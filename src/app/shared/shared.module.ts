// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalCrearPostComponent } from '../components/modal-crear-post/modal-crear-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuLateralComponent } from '../components/menu-lateral/menu-lateral.component';
import { TarjetaPublicacionComponent } from '../components/tarjeta-publicacion/tarjeta-publicacion.component';
import { AlertComponent } from '../components/alert/alert.component';

// shared.module.ts
@NgModule({
  declarations: [
    ModalCrearPostComponent,
    MenuLateralComponent,
    TarjetaPublicacionComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ModalCrearPostComponent,
    MenuLateralComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TarjetaPublicacionComponent,
    AlertComponent
  ],
})
export class SharedModule {}

