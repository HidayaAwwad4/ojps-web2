import { Component } from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-applications-status',
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './applications-status.component.html',
  standalone: true,
  styleUrl: './applications-status.component.css'
})
export class ApplicationsStatusComponent {
  selectedTab: string = 'applied';

  jobs = [
    {
      image: 'assets/NEO.jpg',
      title: 'Frontend Developer',
      description: 'Work with Angular and React to build UIs.',
      salary: '800 - 1000',
      status: 'applied'
    },
    {
      image: 'assets/adham.jpg',
      title: 'Backend Developer',
      description: 'Create REST APIs using Node.js.',
      salary: '900 - 1100',
      status: 'interviewing'
    },
    {
      image: 'assets/AR.jpg',
      title: 'QA Tester',
      description: 'Manual and automated testing.',
      salary: '700 - 900',
      status: 'rejected'
    }
  ];

  get filteredJobs() {
    return this.jobs.filter(job => job.status === this.selectedTab);
  }

  onJobClick(job: any) {
    console.log('Job clicked:', job);
    alert('You clicked on: ' + job.title);
  }
}
