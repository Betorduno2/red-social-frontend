import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {  Router } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-muro',
  templateUrl: './muro.component.html',
  styleUrl: './muro.component.scss'
})
export class MuroComponent implements OnInit {
  showModal: boolean = false;
  posts: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private postService: PostService
  ) {
    
  }

  ngOnInit(): void {
    this.allPosts();
  }

  allPosts() {
    this.postService.getAllPosts().subscribe(
      (data) => {
        this.posts = data;
        console.log(this.posts);
        
      },
      (error) => {
        console.error('Error al obtener los posts:', error);
      }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/inicio-sesion']);
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.allPosts();
    this.showModal = false;
  }
}
