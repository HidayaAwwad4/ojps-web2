import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-job-applications-employers',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './job-applications.component.html',
  styleUrl: './job-applications.component.css'
})
export class JobApplicationsComponent {

  profiles = [
    {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      location: 'New York, USA',
      position: 'Senior Software Engineer',
      description: 'Experienced full-stack developer specializing in React and Node.js',
      image: 'assets/sarah.jpeg'
    },
    {
      name: 'John Doe',
      email: 'john.doe@email.com',
      location: 'San Francisco, USA',
      position: 'Product Manager',
      description: 'Leading product teams and managing the development lifecycle.',
      image: 'assets/john.jpeg'
    },
    {
      name: 'Emma Watson',
      email: 'emma.watson@email.com',
      location: 'London, UK',
      position: 'UI/UX Designer',
      description: 'Designing intuitive user interfaces with a focus on accessibility.',
      image: 'assets/emma.jpeg'
    },
    {
      name: 'James Smith',
      email: 'james.smith@email.com',
      location: 'Sydney, Australia',
      position: 'Data Scientist',
      description: 'Analyzing complex data to extract actionable insights.',
      image: 'assets/james.jpeg'
    }
  ];

}
