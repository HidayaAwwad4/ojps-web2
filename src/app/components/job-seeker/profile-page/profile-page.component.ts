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
export class JobSeekerProfilePageComponent {
  name       = 'Islam Sad Aldeen';
  email      = 'islamsadaldeen@gmail.com';
  location   = 'Palestine nablus';
  aboutMe    = 'I’m looking for new job to develop my expertise';
  experiences = [
    '3asL – Frontend Developer (2022–2024).',
    'Jawwal – Full‑Stack Engineer (2024‑present).'
  ];
  education = [
    'Bachelor of Science in Computer Systems Engineering, Birzeit University, Ramallah (2022).'
  ];
  strengths = ['Adaptable', 'Quick Learner', 'Team Player'];
  weaknesses = ['Workaholic', 'Emotional'];
}
