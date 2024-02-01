import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/users.service';
import { user } from '../../interfaces/user';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.scss'
})
export class MenuLateralComponent implements OnInit {
  showModal: boolean = false;
  userId: string | null;
  user: user = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private postService: PostService,
    private userService: UserService
  ) {
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
    if (this.userId !== null) {
      this.getUserData(this.userId);
    }
  }

  getUserData(userId: string) {
    this.userService.getUserById(userId).subscribe(
      (userData) => {
        this.user = userData;
      },
      (error) => {
        console.error('Error al obtener datos del usuario:', error);
      }
    );
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
