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
    this.jobService.getSeekerByUser().subscribe({
      next: (seeker) => {
        const jobSeekerId = seeker.id;

        this.jobService.getApplicationsByJobSeekerId(jobSeekerId).subscribe(applications => {
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
      },
      error: (err) => {
        console.error('Error fetching job seeker:', err);
      }
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
