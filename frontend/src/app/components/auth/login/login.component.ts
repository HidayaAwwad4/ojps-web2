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

        const user = res.user;
        const token = res.access_token;


        if (!user || !token) {
          this.formInvalidMessage = 'Invalid login response.';
          return;
        }


        if (user.role.name === 'employer' && user.is_approved != 1) {
          this.formInvalidMessage = 'Your employer account is not approved yet. Please wait for admin approval.';
          return;
        }


        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('role', user.role.name);


        if (user.role.name === 'employer') {
          this.router.navigate(['/employer-home']);
        } else if (user.role.name === 'job-seeker') {
          this.router.navigate(['/home-page']);
        } else if (user.role.name === 'admin') {
          this.router.navigate(['/dashboard-admin']);
        } else {

          this.formInvalidMessage = 'Unknown user role.';
        }
      },
      error: (err: any) => {
        console.error('Login error:', err);
        this.formInvalidMessage = err.error?.message || 'Invalid email or password.';
      }
    });
  }

}
