import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.scss'
})

export class InicioSesionComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe(
        (response) => {
          // Maneja la lógica después de un inicio de sesión exitoso
          this.router.navigate(['/muro']);
        },
        (error) => {
          // Muestra una alerta en caso de error
          this.alertService.error('Credenciales inválidas. Por favor, inténtalo de nuevo.');
        }
      );
    } else {
      this.alertService.error('Por favor, completa todos los campos correctamente.');
    }
  }
  
}
