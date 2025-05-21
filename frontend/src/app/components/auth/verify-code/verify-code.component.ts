import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service'; // Update with the correct path

import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent {
  verificationCode: string = '';
  email: string = 'tasneemjber@gmail.com';

  constructor(private authService: AuthService, private router: Router) {}

  verifyCode() {
    if (!this.verificationCode) {
      alert('Please enter the verification code');
      return;
    }

    this.authService.verifyForgotCode(this.email, this.verificationCode).subscribe({
      next: (res: any) => {
        alert(res.message);

        if (res.message === 'Code verified') {
          localStorage.setItem('reset_email', this.email);
          this.router.navigate(['/reset-password']);
        }
      },
      error: (err) => {
        alert(err.error.message || 'Error verifying code');
      }
    });
  }
}
