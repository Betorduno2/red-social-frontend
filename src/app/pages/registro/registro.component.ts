// registro.component.ts
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent {
  registrationForm: FormGroup;
  showAlert: boolean = false;
  alertMessage: string = '';
  isError: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private registerService: RegisterService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      fullName: ['', Validators.required],
      alias: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', [Validators.required, this.passwordsMatchValidator]],
    });
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

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const userDetails = {
        age: this.registrationForm.value.age,
        alias: this.registrationForm.value.alias,
        email: this.registrationForm.value.email,
        fullName: this.registrationForm.value.fullName,
        password: this.registrationForm.value.password
      };
      console.log(userDetails);
      

      this.registerService.register(userDetails).subscribe(
        (response) => {
          // Manejar la lógica después de un registro exitoso
          this.isError = false;
          this.showAlert = true;
          this.alertMessage = 'Registro exitoso.';
          setTimeout(() => {
            this.router.navigate(['/inicio-sesion']);
          }, 3000);
        },
        (error) => {
          // Manejar errores durante el registro
          this.isError = true;
          this.showAlert = true;
          this.alertMessage = 'Error durante el registro. Por favor, inténtalo de nuevo.';
        }
      );
    } else {
      // El formulario no es válido, construir el mensaje de alerta
      const invalidFields: string[] = [];
      for (const controlName in this.registrationForm.controls) {
        const control = this.registrationForm.controls[controlName];
        if (control.invalid) {
          invalidFields.push(controlName);
        }
      }
      this.isError = true;
      this.showAlert = true;
      this.alertMessage = `Por favor, completa todos los campos correctamente. Los siguientes campos son inválidos o requeridos: ${invalidFields.join(', ')}.`;
    }
  }

  hideAlert() {
    this.showAlert = false;
  }
}
