import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../services/jobs/job.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-applications-status',
  templateUrl: './applications-status.component.html',
  styleUrl: './applications-status.component.css',
  standalone: true,
  imports: [NgClass, NgForOf, NgIf]
})
export class ApplicationsStatusComponent implements OnInit {
  selectedTab: string = 'under_review';
  underReviewJobs: any[] = [];
  acceptedJobs: any[] = [];
  rejectedJobs: any[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      console.error('User data not found in localStorage');
      return;
    }

    const user = JSON.parse(userJson);
    const jobSeekerId = user.job_seeker_id ?? user.id;

    if (!jobSeekerId) {
      console.error('Job Seeker ID not found in user data');
      return;
    }

    this.jobService.getApplicationsByJobSeekerId(38).subscribe(applications => {
      this.underReviewJobs = applications.filter(app =>
          ['pending', 'shortlisted'].includes(app.status?.toLowerCase())
      );
      this.acceptedJobs = applications.filter(app =>
          app.status?.toLowerCase() === 'accepted'
      );
      this.rejectedJobs = applications.filter(app =>
          app.status?.toLowerCase() === 'rejected'
      );
    });
  }


  get filteredJobs(): any[] {
    if (this.selectedTab === 'under_review') return this.underReviewJobs;
    if (this.selectedTab === 'accepted') return this.acceptedJobs;
    return this.rejectedJobs;
  }

  onJobClick(app: any) {
  }
}
