import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {NgClass, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',

  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgIf
  ],
  styleUrl: './sign-up.component.css'
})

export class SignUpComponent {
  fullname: string = '';
  email: string = '';
  password: string = '';
  submitted: boolean = false;
  formInvalidMessage: string = '';

  constructor(private router: Router) {}

  onSignUp(form: any) {
    this.submitted = true;
    this.formInvalidMessage = '';

    if (form.invalid) {
      this.formInvalidMessage = 'Please fill in all required fields correctly.';
      return;
    }


    if (!this.email.includes('@')) {
      this.formInvalidMessage = 'Email must contain "@" symbol.';
      return;
    }

    if (this.password.length < 6) {
      this.formInvalidMessage = 'Password must be at least 6 characters.';
      return;
    }


    this.router.navigate(['/field']);
  }

}
