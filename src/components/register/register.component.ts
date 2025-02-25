import { AuthService } from './../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private authService: AuthService, private router: Router) { }

  errorMessage = '';
  isLoding: boolean = false;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
    rePassword: new FormControl(''),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }

    , { validators: [this.confirmPassword] } as FormControlOptions);


  confirmPassword(group: FormGroup): void {

    const password = group.get('password');
    const rePassword = group.get('rePassword');
    if (password?.value == '') {
      rePassword?.setErrors({
        required
          : true
      });
    } else if (password?.value != rePassword?.value) {
      rePassword?.setErrors({ misMatch: true });
    }

  }



  handleForm(): void {
    const userData = this.registerForm.value;
    this.isLoding = true;
    if (this.registerForm.valid == true) {
      this.authService.register(userData).subscribe(
        {
          next: (response) => {

            if (response.message == 'success') {
              this.isLoding = false;
              this.router.navigate(['/login']);
            }

          },
          error: (err) => {
            this.errorMessage = err.error.message;
            this.isLoding = false;
          }
        }
      );
    }
  }
}
