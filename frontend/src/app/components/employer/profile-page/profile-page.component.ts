import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { JobCardComponent } from '../job-card/job-card.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { AuthService } from '../../../services/auth/auth.service';
import { JobService } from '../../../services/jobs/job.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    NavbarComponent,
    NgForOf,
    NgIf,
    JobCardComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class EmployerProfilePageComponent implements OnInit {
  name = '';
  email = '';
  location = '';
  aboutMe = '';
  profilePictureUrl = 'assets/account-avatar.png';
  loading = true;
  error = false;
  jobs: any[] = [];

  constructor(
    private authService: AuthService,
    private jobService: JobService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProfileData();
    this.loadJobs();
  }

  loadProfileData(): void {
    this.loading = true;
    console.log('=== LOADING EMPLOYER PROFILE DATA START ===');
    
    this.authService.getProfile().subscribe({
      next: (response: any) => {
        console.log('Raw employer profile response:', JSON.stringify(response, null, 2));
        
        if (response.status && response.data) {
          const data = response.data;

          console.log('Employer profile data extracted:', data);
          console.log('Profile picture URL:', data.user?.profile_picture_url);

          this.name = data.user?.name || '';
          this.email = data.user?.email || '';
          this.location = data.user?.location || 'No location specified';
          this.aboutMe = data.user?.summary || 'No summary provided';
          
          this.profilePictureUrl = data.user?.profile_picture_url || 'assets/account-avatar.png';

          console.log('Final employer component data:', {
            name: this.name,
            email: this.email,
            location: this.location,
            aboutMe: this.aboutMe,
            profilePictureUrl: this.profilePictureUrl
          });
        } else {
          console.error('Invalid response format from server');
          this.error = true;
        }

        console.log('=== LOADING EMPLOYER PROFILE DATA END ===');
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading employer profile:', err);
        this.loading = false;
        this.error = true;
      }
    });
  }

  loadJobs(): void {
    this.jobService.getEmployerByUser().subscribe({
      next: (employerData) => {
        const employerId = employerData.id;
        this.jobService.getJobsByEmployer(employerId).subscribe({
          next: (data) => {
            this.jobs = data.data || [];
            console.log('Employer profile jobs:', this.jobs);
          },
          error: (err) => {
            console.error('Failed to load jobs for employer profile:', err);
          }
        });
      },
      error: (err) => {
        console.error('Failed to load employer info for job listings:', err);
      }
    });
  }

  navigateToEditProfile(): void {
    this.router.navigate(['/edit-profile']);
  }

  closeJob(job: any): void {
    job.isOpened = false;
    this.jobService.updateJobStatus(job.id, false).subscribe({
      next: () => {
        console.log('Job closed successfully');
      },
      error: (err) => {
        console.error('Error closing job:', err);
        job.isOpened = true;
      }
    });
  }
}