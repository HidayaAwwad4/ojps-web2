import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  imports: [FormsModule],
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent implements OnInit {
  verificationCode: string = '';
  email: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const storedEmail = localStorage.getItem('reset_email');
    if (storedEmail) {
      this.email = storedEmail;
    } else {
      alert('Email not found. Please go back and enter your email again.');
      this.router.navigate(['/forgot-password']);
    }
  }

  verifyCode() {
    if (!this.verificationCode) {
      alert('Please enter the verification code');
      return;
    }

    this.authService.verifyForgotCode(this.email, this.verificationCode).subscribe({
      next: (res: any) => {
        alert(res.message);
        if (res.message === 'Code verified') {
          this.router.navigate(['/reset-password']);
        }
      },
      error: (err) => {
        alert(err.error.message || 'Error verifying code');
      }
    });
  }
}
