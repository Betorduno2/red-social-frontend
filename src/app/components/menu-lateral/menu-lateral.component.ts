import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.scss'
})
export class MenuLateralComponent {
  showModal: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private postService: PostService
  ) {
    
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  navigate(url: string) {
    this.router.navigate([url])
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/inicio-sesion']);
  }
}
