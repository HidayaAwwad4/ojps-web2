import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-edit-profile-page',
  standalone: true,
  imports: [FormsModule, NavbarComponent],
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.css']
})
export class EditProfilePageComponent {
  // form model fields
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  location: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  aboutMe: string = '';
}
