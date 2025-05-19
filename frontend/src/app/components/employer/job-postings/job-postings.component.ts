import { Component, OnInit } from '@angular/core';
import { JobCardComponent } from '../job-card/job-card.component';
import { NgForOf, NgIf } from '@angular/common';
import { JobModalService } from '../../../services/job-modal.service';
import { CreateJobComponent } from '../create-job/create-job.component';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import {JobService} from '../../../services/jobs/job.service';


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
    const employerId = 1;

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

  closeJob(job: any) {
    job.status = 'closed';
  }

  get filteredJobs() {
    return this.jobs.filter(job => {
      if (this.selectedTab === 'open') {
        return job.isOpened === 1;
      } else if (this.selectedTab === 'closed') {
        return job.isOpened === 0;
      }
      return false;
    });
  }

}
