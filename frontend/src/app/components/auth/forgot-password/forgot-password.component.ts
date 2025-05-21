import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
  standalone: true,
  imports: [FormsModule, NgIf],
})
export class ForgotPasswordComponent {
  email: string = '';
  submitted = false;
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  sendResetCode() {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.email) {
      this.errorMessage = 'Email is required.';
      return;
    }

    this.authService.forgotPassword(this.email).subscribe({
      next: (res: any) => {
        this.successMessage = res.message || 'Code sent successfully!';

        this.router.navigate(['/verify-code'], {
          queryParams: { email: this.email },
        });
      },
      error: (err) => {

        this.errorMessage = err.error?.message || 'Something went wrong.';
      },
    });
  }

}
