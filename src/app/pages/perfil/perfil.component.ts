import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/users.service';
import { AlertService } from '../../services/alert.service';
import { user } from '../../interfaces/user';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  perfilForm: FormGroup;
  userId: string | null;
  user: user = {};

  constructor(
    private fb: FormBuilder, 
    private registerService: RegisterService,
    private userService: UserService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.perfilForm = this.fb.group({
      fullName: ['', Validators.required],
      alias: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', [Validators.required, this.passwordsMatchValidator]],
    });
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
    if (this.userId !== null) {
      this.getUserData(this.userId);
    }
  }

  passwordsMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const repeatPassword = control.get('repeatPassword');
    // Verifica si las contraseñas son iguales
    if (password && repeatPassword && password.value !== repeatPassword.value) {
      return { 'passwordsNotMatch': true };
    }
    return null;
  }

  getUserData(userId: string) {
    this.userService.getUserById(userId).subscribe(
      (userData) => {
        // Establecer los datos del usuario en el formulario
        this.user = userData;
        const { password, ...userDataWithoutPassword } = userData;
        this.perfilForm.patchValue(userDataWithoutPassword);
      },
      (error) => {
        console.error('Error al obtener datos del usuario:', error);
      }
    );
  }

  onSubmit() {
    if (this.perfilForm.valid) {
      // Obtener los valores del formulario y enviar la solicitud de actualización
      const updatedUserData = {
        userId: this.userId,
        ...this.perfilForm.value
      };
      this.userService.updateUser(updatedUserData).subscribe(
        (response) => {
          // Realizar acciones adicionales si es necesario
          this.alertService.success('Usuario actualizado con éxito.');
        },
        (error) => {
          this.alertService.error('Error al actualizar el usuario.');
        }
      );
    }else {
      
      const invalidFields: string[] = [];
      for (const controlName in this.perfilForm.controls) {
        const control = this.perfilForm.controls[controlName];
        console.log(controlName);
        
        if (control.invalid) {
          invalidFields.push(controlName);
        }
      }
      this.alertService.error(`Por favor, completa todos los campos. Los siguientes campos son inválidos o requeridos: ${invalidFields.join(', ')}.`);
    }
  }
}
