import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf, NgClass, RouterLink],
})
export class SignUpComponent implements OnInit {
  userType: string | null = null;
  name: string = '';
  companyName: string = '';
  email: string = '';
  password: string = '';
  submitted: boolean = false;
  formInvalidMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.userType = params.get('role');
      console.log('User type:', this.userType);
    });
  }

  onSignUp(form: any) {
    this.submitted = true;
    this.formInvalidMessage = '';

    if (form.invalid) {
      this.formInvalidMessage = 'Please fill all required fields correctly.';
      return;
    }

    if (this.userType === 'employer' && !this.companyName) {
      this.formInvalidMessage = 'Company name is required for employers.';
      return;
    }

    let role_id: number | null = null;
    if (this.userType === 'employer') {
      role_id = 1;
    } else if (this.userType === 'job-seeker') {
      role_id = 2;
    }

    if (!role_id) {
      this.formInvalidMessage = 'Invalid user type.';
      return;
    }

    const registerData = {
      name: this.name,
      company_name: this.companyName,
      email: this.email,
      password: this.password,
      role_id: role_id,
    };

    this.authService.register(registerData).subscribe({
      next: (res: any) => {
        console.log('Registered successfully:', res);


        if (this.userType === 'employer') {
          alert('Your registration request has been sent to the admin. Please wait for approval.');
          this.router.navigate(['/login']);
        }

        else if (this.userType === 'job-seeker') {
          if (res.token) {
            this.authService.setToken(res.token);
          }
          this.router.navigate(['/field']);
        }
      },
      error: (err) => {
        console.error('Registration error:', err);
        this.formInvalidMessage = err.error?.message || 'Registration failed. Please try again.';
      },
    });
  }

}
