import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CandidateService } from '../../../services/jobs/candidate.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-candidate-view',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterLink],
  templateUrl: './candidate-view.component.html',
  styleUrls: ['./candidate-view.component.css']
})
export class CandidateViewComponent implements OnInit {
  // Basic profile data
  name: string = '';
  email: string = '';
  location: string = '';
  aboutMe: string = '';
  profilePictureUrl: string = 'assets/account-avatar.png';
  
  // Resume data
  experiences: any[] = [];
  education: any[] = [];
  skills: string[] = [];
  resumeUrl: string | null = null;
  
  // Application data
  applicationId: number | null = null;
  jobSeekerId: number | null = null;
  applicationStatus: string = '';
  
  // UI states
  loading: boolean = true;
  error: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private candidateService: CandidateService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Get application ID from route query params
    this.route.queryParams.subscribe(params => {
      const applicationId = Number(params['applicationId']);
      if (applicationId) {
        this.applicationId = applicationId;
        this.loadApplicationData(applicationId);
      } else {
        this.error = true;
        this.errorMessage = 'No application ID provided';
        this.loading = false;
      }
    });
  }

  loadJobSeekerProfile(jobSeekerId: number): void {
    this.candidateService.getJobSeekerProfile(jobSeekerId).subscribe({
      next: (response) => {
        console.log('Job seeker profile:', response);
        if (response.status && response.data) {
          const data = response.data;
          
          // Basic user info
          this.name = data.user?.name || '';
          this.email = data.user?.email || '';
          this.location = data.user?.location || 'No location specified';
          this.aboutMe = data.user?.summary || 'No summary provided';
          
          // Profile picture
          if (data.user?.profile_picture_url) {
            this.profilePictureUrl = data.user.profile_picture_url;
          } else if (data.user?.profile_picture) {
            this.profilePictureUrl = `http://localhost:8000/storage/${data.user.profile_picture}`;
          }
          
          // Parse JSON strings to JavaScript objects
          try {
            // Handle experience data - could be a JSON string or already parsed array
            if (typeof data.experience === 'string') {
              this.experiences = JSON.parse(data.experience);
            } else {
              this.experiences = Array.isArray(data.experience) ? data.experience : [];
            }
            
            // Handle education data - could be a JSON string or already parsed array
            if (typeof data.education === 'string') {
              this.education = JSON.parse(data.education);
            } else {
              this.education = Array.isArray(data.education) ? data.education : [];
            }
            
            // Handle skills data - could be a JSON string or already parsed array
            if (typeof data.skills === 'string') {
              this.skills = JSON.parse(data.skills);
            } else {
              this.skills = Array.isArray(data.skills) ? data.skills : [];
            }
            
            console.log('Parsed data:', {
              experiences: this.experiences,
              education: this.education,
              skills: this.skills
            });
          } catch (e) {
            console.error('Error parsing JSON data:', e);
            this.experiences = [];
            this.education = [];
            this.skills = [];
          }
          
          this.resumeUrl = data.resume_path || null;
          
          this.loading = false;
        } else {
          this.error = true;
          this.errorMessage = 'Invalid profile data structure';
          this.loading = false;
        }
      },
      error: (error) => {
        console.error('Error loading job seeker profile:', error);
        this.error = true;
        this.errorMessage = 'Failed to load candidate profile';
        this.loading = false;
      }
    });
  }

  loadApplicationData(applicationId: number): void {
    this.loading = true;
    this.candidateService.getApplicationDetails(applicationId).subscribe({
      next: (response) => {
        console.log('Application details:', response);
        
        // Extract application data
        this.applicationStatus = response.status;
        
        // Extract job seeker data
        if (response.job_seeker && response.job_seeker.id) {
          this.jobSeekerId = response.job_seeker.id;
          this.loadJobSeekerProfile(response.job_seeker.id);
        } else {
          this.error = true;
          this.errorMessage = 'No job seeker information found';
          this.loading = false;
        }
      },
      error: (error) => {
        console.error('Error loading application details:', error);
        this.error = true;
        this.errorMessage = 'Failed to load application details';
        this.loading = false;
      }
    });
  }

  handleImageError(event: any): void {
    event.target.src = 'assets/account-avatar.png';
  }

  viewResume(): void {
    if (this.resumeUrl) {
      window.open(this.resumeUrl, '_blank');
    } else if (this.jobSeekerId) {
      this.downloadResume();
    }
  }

  downloadResume(): void {
    if (!this.jobSeekerId) return;
    
    this.candidateService.downloadResume(this.jobSeekerId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.name}_resume.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error downloading resume:', error);
        alert('Failed to download resume. The candidate may not have uploaded a resume.');
      }
    });
  }

  acceptCandidate(): void {
    this.updateApplicationStatus('accepted');
  }

  shortlistCandidate(): void {
    this.updateApplicationStatus('shortlisted');
  }

  rejectCandidate(): void {
    this.updateApplicationStatus('rejected');
  }

  private updateApplicationStatus(status: string): void {
  if (!this.applicationId) return;
  
  // Show some loading indicator or disable buttons
  const buttonElement = document.querySelector(`.btn-${status.toLowerCase()}`);
  if (buttonElement) {
    buttonElement.setAttribute('disabled', 'true');
    buttonElement.textContent = `Processing...`;
  }
  
  this.candidateService.updateApplicationStatus(this.applicationId, status).subscribe({
    next: (response) => {
      console.log(`Application ${status} successfully:`, response);
      this.applicationStatus = status;
      if (buttonElement) {
        buttonElement.removeAttribute('disabled');
        buttonElement.textContent = status.charAt(0).toUpperCase() + status.slice(1);
      }
      alert(`Candidate has been ${status}.`);
    },
    error: (error) => {
      console.error(`Error updating application status to ${status}:`, error);
      if (buttonElement) {
        buttonElement.removeAttribute('disabled');
        buttonElement.textContent = status.charAt(0).toUpperCase() + status.slice(1);
      }
      alert(`Failed to ${status} candidate. Please try again. Error: ${error.message || 'Unknown error'}`);
    }
  });
}
}