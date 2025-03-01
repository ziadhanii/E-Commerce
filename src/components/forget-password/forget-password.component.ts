import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  requestResetPassword: boolean = true;
  verifyCode: boolean = false;
  resetPassword: boolean = false;
  message: string = '';
  savedEmail: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  requestResetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  verifyCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl('', [Validators.required]),
  });

  resetPasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [Validators.required]),
  });


  onRequestResetPasswordFormSubmit() {
    if (this.requestResetPasswordForm.invalid) {
      return;
    }

    let ExtractedEmail = this.requestResetPasswordForm.value.email;
    this.savedEmail = ExtractedEmail;

    this.authService.requestResetPassword(ExtractedEmail).subscribe({
      next: (res) => {
        console.log(res);
        if (res.statusMsg === 'success') {
          this.message = res.message;
        }
        this.requestResetPassword = false;
        this.verifyCode = true;
        this.resetPassword = false;
      },
      error: (err) => {
        this.message = err.error.message;
      }
    });
  }

  onVerifyCodeFormSubmit() {
    let ExtractedResetCode = this.verifyCodeForm.value.resetCode.trim();
    this.authService.verifyResetCode(ExtractedResetCode).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.message = res.status;
        }
        this.requestResetPassword = false;
        this.verifyCode = false;
        this.resetPassword = true;
      },
      error: (err) => {
        this.message = err.error.message;
      }
    });

  }

  onResetPasswordFormSubmit() {
    let ExtractedNewPassword = this.resetPasswordForm.value.newPassword;
    this.authService.resetPassword(this.savedEmail, ExtractedNewPassword).subscribe({
      next: (res) => {
        console.log(res);
        if (res?.token) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home']);
          this.message = res.message;
        }

        this.requestResetPassword = true;
        this.verifyCode = false;
        this.resetPassword = false;
      },
      error: (err) => {
        this.message = err.error.message;
      }

    });
  }

  get email() {
    return this.requestResetPasswordForm.get('email');
  }

  get resetCode() {
    return this.verifyCodeForm.get('resetCode');
  }

  get newPassword() {
    return this.resetPasswordForm.get('newPassword');
  }

}
