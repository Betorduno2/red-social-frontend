import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MuroComponent } from './muro.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: '', component: MuroComponent },
];

@NgModule({
  declarations: [MuroComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class MuroModule { }
