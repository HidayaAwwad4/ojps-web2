import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-candidate-view',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterLink],
  templateUrl: './candidate-view.component.html',
  styleUrls: ['./candidate-view.component.css']
})
export class CandidateViewComponent {
  name = 'Jane Doe';
  email = 'jane@example.com';
  location = 'New York, USA';
  aboutMe = 'A passionate software engineer with 5+ years of experience...';

  experiences = [
    'Software Engineer at ABC Corp (2019 - Present)',
    'Web Developer at XYZ Inc (2016 - 2019)'
  ];

  education = [
    'B.Sc. in Computer Science, MIT',
    'High School Diploma, Central High School'
  ];

  skills = ['Teamwork', 'Problem Solving', 'Adaptability'];


}
