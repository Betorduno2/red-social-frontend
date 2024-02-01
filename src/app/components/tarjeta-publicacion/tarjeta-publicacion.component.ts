import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarjeta-publicacion',
  templateUrl: './tarjeta-publicacion.component.html',
  styleUrl: './tarjeta-publicacion.component.scss'
})
export class TarjetaPublicacionComponent implements OnInit {
  @Input() posts: any[] = [];

   ngOnInit(): void {
       console.log(this.posts);
       
   }
}
