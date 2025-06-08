import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JobModalService } from '../../../services/jobs/job-modal.service';
import { JobCardComponent } from '../job-card/job-card.component';
import { CreateJobComponent } from '../create-job/create-job.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { JobService } from '../../../services/jobs/job.service';

@Component({
  selector: 'app-employer-home',
  standalone: true,
  imports: [
    JobCardComponent,
    NgForOf,
    RouterLink,
    CreateJobComponent,
    NavbarComponent
  ],
  templateUrl: './employer-home.component.html',
  styleUrl: './employer-home.component.css'
})
export class EmployerHomeComponent implements OnInit {
  jobs: any[] = [];

  constructor(
    private jobModalService: JobModalService,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.jobService.getEmployerByUser().subscribe({
      next: (employerData) => {
        const employerId = employerData.id;
        this.jobService.getJobsByEmployer(employerId).subscribe({
          next: (data) => {
            this.jobs = (data.data || [])
              .filter((job: any) => job.isOpened === 1 || job.isOpened === true)
              .slice(0, 4);
            console.log('jobs', this.jobs);
          },
          error: (err) => {
            console.error('Failed to load jobs:', err);
          }
        });
      },
      error: (err) => {
        console.error('Failed to load employer info:', err);
      }
    });
  }

  openJobModal(): void {
    this.jobModalService.openCreateJobModal();
  }

  addJobToList(newJob: any): void {
    this.jobs.unshift(newJob);
  }

  onJobStatusChange(event: { job: any; isOpened: boolean }) {
    const index = this.jobs.findIndex(j => j.id === event.job.id);
    if (index !== -1) {
      if (!event.isOpened) {
        this.jobs.splice(index, 1);
      } else {
        this.jobs[index].isOpened = true;
      }
    }
  }
}
