import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { JobService } from '../../../services/jobs/job.service';

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
export class JobApplicationsComponent implements OnInit {
  profiles: any[] = [];
  filteredProfiles: any[] = [];
  selectedFilter: string = 'all';

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const jobId = Number(this.route.snapshot.queryParamMap.get('jobId'));
    if (jobId) {
      this.loadApplications(jobId);
    }
  }

  loadApplications(jobId: number) {
    this.jobService.getApplicantsByJobId(jobId).subscribe({
      next: (data) => {
        this.profiles = data;
        this.filteredProfiles = [...this.profiles];
        console.log('Loaded applications:', this.profiles);
      },
      error: (err) => {
        console.error('Failed to load applications', err);
      }
    });
  }

  getProfilePictureUrl(profile: any): string {
    // Check if the API returns profile_picture_url
    if (profile.job_seeker?.user?.profile_picture_url) {
      return profile.job_seeker.user.profile_picture_url;
    }
    
    // If there's a profile_picture field, construct the URL
    if (profile.job_seeker?.user?.profile_picture) {
      return `http://localhost:8000/storage/${profile.job_seeker.user.profile_picture}`;
    }
    
    // Default fallback
    return 'assets/account-avatar.png';
  }

  handleImageError(event: any): void {
    event.target.src = 'assets/account-avatar.png';
  }

  filterProfiles(status: string) {
    this.selectedFilter = status;
    if (status === 'all') {
      this.filteredProfiles = [...this.profiles];
    } else {
      this.filteredProfiles = this.profiles.filter(p => p.status === status);
    }
  }

  shortlist(event: Event, profile: any) {
    event.stopPropagation();
    this.updateStatus(profile, 'shortlisted');
  }

  accept(event: Event, profile: any) {
    event.stopPropagation();
    this.updateStatus(profile, 'accepted');
  }

  reject(event: Event, profile: any) {
    event.stopPropagation();
    this.updateStatus(profile, 'rejected');
  }

  private updateStatus(profile: any, newStatus: string) {
    this.jobService.updateApplicationStatus(profile.id, newStatus).subscribe({
      next: (updated) => {
        profile.status = newStatus;
      },
      error: (err) => {
        console.error(`Failed to update status to ${newStatus}`, err);
      }
    });
  }
}