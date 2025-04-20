import { Component } from '@angular/core';
import { JobCardComponent } from '../job-card/job-card.component';
import { NgForOf } from '@angular/common';
import { JobModalService } from '../../../services/job-modal.service';
import { CreateJobComponent } from '../create-job/create-job.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-job-postings',
  standalone: true,
  imports: [JobCardComponent, NgForOf, CreateJobComponent, RouterLink],
  templateUrl: './job-postings.component.html',
  styleUrls: ['./job-postings.component.css']
})
export class JobPostingsComponent {
  selectedTab: string = 'open';

  constructor(private jobModalService: JobModalService) {}

  openJobModal() {
    this.jobModalService.openCreateJobModal();
  }

  jobs = [
    {
      image: 'assets/adham.jpg',
      title: 'Full-Stack Developer',
      description: 'Responsible for developing both front-end and back-end systems.',
      salary: '$800 - $1000 Salary/Month',
      status: 'open'
    },
    {
      image: 'assets/adham.jpg',
      title: 'UI/UX Designer',
      description: 'Focus on crafting intuitive and visually appealing user interfaces.',
      salary: '$700 - $900 Salary/Month',
      status: 'open'
    },
    {
      image: 'assets/adham.jpg',
      title: 'Mobile App Developer',
      description: 'Build and maintain cross-platform mobile applications.',
      salary: '$750 - $950 Salary/Month',
      status: 'open'
    },
    {
      image: 'assets/adham.jpg',
      title: 'Data Analyst',
      description: 'Analyze data trends and create reports.',
      salary: '$850 - $1050 Salary/Month',
      status: 'open'
    },
    {
      image: 'assets/adham.jpg',
      title: 'UI Designer',
      description: 'Focus on crafting intuitive and visually appealing user interfaces.',
      salary: '$700 - $900 Salary/Month',
      status: 'closed'
    },
  ];

  closeJob(job: any) {
    job.status = 'closed';
  }

  get filteredJobs() {
    return this.jobs.filter(job => job.status === this.selectedTab);
  }
}
