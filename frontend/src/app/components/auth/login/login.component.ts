import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    FormsModule,
    NgClass,
    NgIf
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  submitted: boolean = false;
  formValidButWrongFormat: boolean = false;
  formInvalidMessage: string = '';

  constructor(private router: Router) {}

  onLogin(form: any) {
    this.submitted = true;
    this.formValidButWrongFormat = false;
    this.formInvalidMessage = '';

    if (form.invalid) {
      this.formInvalidMessage = 'Please enter your email and password.';
      return;
    }
    const isEmailValid = this.email.includes('@');
    const isPasswordValid = this.password.length >= 6;

    if (isEmailValid && isPasswordValid) {
      this.router.navigate(['/home-page']);
    } else {
      this.formValidButWrongFormat = true;
    }
  }
}
