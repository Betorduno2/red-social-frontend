import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.scss'
})

export class InicioSesionComponent {
  loginForm: FormGroup;
  showAlert: boolean = false;
  alertMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.showAlert = false;
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe(
        (response) => {
          // Maneja la lógica después de un inicio de sesión exitoso
          this.router.navigate(['/muro']);
          console.log('Inicio de sesión exitoso:', response);
        },
        (error) => {
          // Muestra una alerta en caso de error
          this.showAlert = true;
          this.alertMessage = 'Credenciales inválidas. Por favor, inténtalo de nuevo.';
          console.error('Error al iniciar sesión:', error);
        }
      );
    } else {
      this.showAlert = true;
      this.alertMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }

  hideAlert() {
    this.showAlert = false;
  }
  
}
