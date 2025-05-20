import { Component, OnInit } from '@angular/core';
import { JobCardComponent } from '../job-card/job-card.component';
import { NgForOf, NgIf } from '@angular/common';
import { CreateJobComponent } from '../create-job/create-job.component';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { JobService } from '../../../services/jobs/job.service';

@Component({
  selector: 'app-job-postings',
  standalone: true,
  imports: [JobCardComponent, NgForOf, NgIf, CreateJobComponent, RouterLink, NavbarComponent],
  templateUrl: './job-postings.component.html',
  styleUrls: ['./job-postings.component.css']
})
export class JobPostingsComponent implements OnInit {
  selectedTab: string = 'open';
  jobs: any[] = [];
  loading = false;
  error = '';

  constructor(
    private jobService: JobService
  ) {}

  ngOnInit() {
    this.fetchJobs();
  }

  fetchJobs() {
    const employerId = 37;

    this.loading = true;
    this.error = '';
    this.jobService.getJobsByEmployer(employerId).subscribe({
      next: (data) => {
        this.jobs = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load jobs';
        this.loading = false;
      }
    });
  }

  onJobStatusChange(event: { job: any; isOpened: boolean }) {
    const updatedJob = { ...event.job, isOpened: event.isOpened ? 1 : 0 };

    this.jobService.updateJob(event.job.id, updatedJob).subscribe({
      next: () => {
        const index = this.jobs.findIndex(j => j.id === event.job.id);
        if (index !== -1) {
          this.jobs[index].isOpened = updatedJob.isOpened;
        }
      },
      error: (err) => {
        console.error('Failed to update job status:', err);
      }
    });
  }

  get filteredJobs() {
    return this.jobs.filter(job => {
      if (this.selectedTab === 'open') {
        return job.isOpened === 1 || job.isOpened === true;
      } else if (this.selectedTab === 'closed') {
        return job.isOpened === 0 || job.isOpened === false;
      }
      return false;
    });
  }
}
