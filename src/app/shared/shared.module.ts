// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalCrearPostComponent } from '../components/modal-crear-post/modal-crear-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// shared.module.ts
@NgModule({
  declarations: [ModalCrearPostComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [ModalCrearPostComponent, CommonModule, FormsModule, ReactiveFormsModule],
})
export class SharedModule {}

