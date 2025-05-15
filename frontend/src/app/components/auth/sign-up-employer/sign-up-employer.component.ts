import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-sign-up-employer',
  templateUrl: './sign-up-employer.component.html',
  styleUrls: ['./sign-up-employer.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NgIf,
    NgClass
  ]
})
export class SignUpEmployerComponent {
  fullname: string = '';
  companyName: string = '';
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


    this.router.navigate(['/employer-home']);
  }
}
