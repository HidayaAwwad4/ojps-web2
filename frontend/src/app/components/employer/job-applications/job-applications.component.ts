import { Component } from '@angular/core';
import {NgForOf, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-job-applications-employers',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    NavbarComponent,
    NgSwitch,
    NgSwitchCase,
    NgIf
  ],
  templateUrl: './job-applications.component.html',
  styleUrl: './job-applications.component.css'
})
export class JobApplicationsComponent {
  selectedFilter: string = 'all';

  allProfiles = [
    {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      location: 'New York, USA',
      position: 'Senior Software Engineer',
      description: 'Experienced full-stack developer specializing in React and Node.js',
      image: 'assets/sarah.jpeg',
      status: 'pending'
    },
    {
      name: 'John Doe',
      email: 'john.doe@email.com',
      location: 'San Francisco, USA',
      position: 'Product Manager',
      description: 'Leading product teams and managing the development lifecycle.',
      image: 'assets/john.jpeg',
      status: 'shortlisted'
    },
    {
      name: 'Emma Watson',
      email: 'emma.watson@email.com',
      location: 'London, UK',
      position: 'UI/UX Designer',
      description: 'Designing intuitive user interfaces with a focus on accessibility.',
      image: 'assets/emma.jpeg',
      status: 'accepted'
    },
    {
      name: 'James Smith',
      email: 'james.smith@email.com',
      location: 'Sydney, Australia',
      position: 'Data Scientist',
      description: 'Analyzing complex data to extract actionable insights.',
      image: 'assets/james.jpeg',
      status: 'rejected'
    }
  ];

  profiles = [...this.allProfiles];

  constructor(private router: Router) {}

  filterProfiles(status: string) {
    this.selectedFilter = status;
    if (status === 'all') {
      this.profiles = [...this.allProfiles];
    } else {
      this.profiles = this.allProfiles.filter(profile => profile.status === status);
    }
  }

  shortlist(event: Event, profile: any) {
    event.stopPropagation();
    profile.status = 'shortlisted';
    this.filterProfiles(this.selectedFilter);
  }

  reject(event: Event, profile: any) {
    event.stopPropagation();
    profile.status = 'rejected';
    this.filterProfiles(this.selectedFilter);
  }

  accept(event: Event, profile: any) {
    event.stopPropagation();
    profile.status = 'accepted';
    this.filterProfiles(this.selectedFilter);
  }
}
