import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-modal-crear-post',
  templateUrl: './modal-crear-post.component.html',
  styleUrl: './modal-crear-post.component.scss'
})
export class ModalCrearPostComponent {
  @Input() showModal: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  postForm: FormGroup;
  showAlert: boolean = false;
  alertMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private postService: PostService
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  onSubmit(): void {
    console.log(this.postForm.valid);
    
    if (this.postForm.valid) {
      const postDetails = {
        title: this.postForm.value.title,
        content: this.postForm.value.content,
        userId: localStorage.getItem('userId')
      };
      console.log('entro auqi');
      this.showAlert = false;

      this.postService.createPost(postDetails).subscribe(
        (response) => {
          // Manejar la respuesta después de crear el post
          this.closeModal.emit()
          console.log('Post creado con éxito:', response);
        },
        (error) => {
          // Manejar errores durante la creación del post
          console.error('Error al crear el post:', error);
        }
      );
    } else {
      this.showAlert = true;
      this.alertMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }

  closeEmit() {
    console.log('hola');
    
    this.closeModal.emit()
  }

  hideAlert() {
    this.showAlert = false;
  }
}
