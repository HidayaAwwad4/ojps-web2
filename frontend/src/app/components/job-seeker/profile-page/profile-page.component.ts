import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { AuthService } from '../../../services/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    NavbarComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class JobSeekerProfilePageComponent implements OnInit {
  name = '';
  email = '';
  location = '';
  aboutMe = '';
  experiences: any[] = [];
  education: any[] = [];
  skills: string[] = [];
  resumeUrl: string | null = null;
  loading = true;
  error = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadProfileData();
  }

  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  loadProfileData(): void {
    this.loading = true;
    console.log('=== LOADING PROFILE DATA START ===');
    
    this.authService.getProfile().subscribe({
      next: (response: any) => {
        console.log('Raw profile response:', JSON.stringify(response, null, 2));
        
        if (response.status && response.data) {
          const data = response.data;
  
          console.log('Profile data extracted:', data);
          console.log('Experience from response:', data.experience);
          console.log('Education from response:', data.education);
          console.log('Skills from response:', data.skills);
  
          // Basic user info
          this.name = data.user?.name || '';
          this.email = data.user?.email || '';
          this.location = data.user?.location || 'No location specified';
          this.aboutMe = data.user?.summary || 'No summary provided';
  
          // Resume data
          this.experiences = Array.isArray(data.experience) ? data.experience : [];
          this.education = Array.isArray(data.education) ? data.education : [];
          this.skills = Array.isArray(data.skills) ? data.skills : [];
          this.resumeUrl = data.resume_path || null;
  
          console.log('Final component data:', {
            experiences: this.experiences,
            education: this.education,
            skills: this.skills,
            resumeUrl: this.resumeUrl
          });
        } else {
          console.error('Invalid response format from server');
        }
  
        console.log('=== LOADING PROFILE DATA END ===');
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading profile:', err);
        this.loading = false;
        this.error = true;
      }
    });
  }

  navigateToEditProfile(): void {
    this.router.navigate(['/edit-profile']);
  }

  

  navigateToEditResume(): void {
    this.router.navigate(['/resume-management']);
  }
}