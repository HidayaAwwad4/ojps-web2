import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';

import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    NavbarComponent,
    NgForOf
  ],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class AdminProfilePageComponent {
  name       = 'Islam Sad Aldeen';
  email      = 'islamsadaldeen@gmail.com';
  location   = 'Palestine nablus';
  aboutMe    = 'I’m looking for new job to develop my expertise';
}
