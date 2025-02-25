import { AuthService } from './../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) { }

  errorMessage = '';
  isLoading: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  handleForm(): void {
    const loginData = this.loginForm.value;
    this.isLoading = true;
    if (this.loginForm.valid) {
      this.authService.login(loginData).subscribe(
        {
          next: (response) => {
            if (response.message === 'success') {

              localStorage.setItem('token', response.token);
              this.authService.deCodeUserToken();
              this.isLoading = false;
              this.router.navigate(['/home']);
            }
          },
          error: (err) => {
            this.errorMessage = err.error.message;
            this.isLoading = false;
          }
        }
      );
    }
  }
}
