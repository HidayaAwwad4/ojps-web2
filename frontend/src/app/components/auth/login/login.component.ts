import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, NgClass, NgIf]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  submitted: boolean = false;
  formValidButWrongFormat: boolean = false;
  formInvalidMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  onLogin(form: any) {
    this.submitted = true;
    this.formValidButWrongFormat = false;
    this.formInvalidMessage = '';

    if (form.invalid) {
      this.formInvalidMessage = 'Please enter your email and password.';
      return;
    }

    const loginData = {
      email: this.email,
      password: this.password
    };

    this.authService.login(loginData).subscribe({
      next: (res: any) => {
        console.log('Login success:', res);

        localStorage.setItem('token', res.access_token);
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('role', res.user.role.name);

        const role = res.user.role.name;

        if (role == 'employer') {
          this.router.navigate(['/employer-home']);
        } else if (role == 'job-seeker') {
          this.router.navigate(['/home-page']);
        } else if (role == 'admin') {
          this.router.navigate(['/dashboard-admin']);
        }
      },
      error: (err: any) => {
        console.error('Login error:', err);
        this.formInvalidMessage = err.error?.message || 'Invalid email or password.';
      }
    });
  }

}


