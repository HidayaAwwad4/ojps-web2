import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-recommended-jobs',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './recommended-jobs.component.html',
  styleUrl: './recommended-jobs.component.css'
})
export class RecommendedJobsComponent {
  recommendedJobs = [
    { title: 'Front-End Development', salary: '$1000 - $2500', location: 'Palestine - Nablus' },
    { title: 'Back-End Development', salary: '$2500 - $3000', location: 'Palestine - Ramallah' },
    { title: 'UI/UX Designer', salary: '$1500 - $2000', location: 'Palestine - Nablus' },
    { title: 'Account Manager', salary: '$1000 - $2000', location: 'Palestine - Ramallah' },
    { title: 'Quality assurance', salary: '$2000 - $3000', location: 'Palestine - Ramallah' },
    { title: 'Data analyst', salary: '$3000 - $4000', location: 'Palestine - Nablus' },
  ];
}
