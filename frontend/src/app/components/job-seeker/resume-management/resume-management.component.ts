import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-resume-management',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './resume-management.component.html',
  styleUrls: ['./resume-management.component.css']
})
export class ResumeManagementComponent implements OnInit {
  // User profile data
  name: string = '';
  email: string = '';
  location: string = '';
  aboutMe: string = '';
  
  // Resume data
  experiences: any[] = [];
  education: any[] = [];
  skills: string[] = [];
  resumeUrl: string | null = null;
  
  // UI state
  showResumeModal = false;
  uploadedResumeFile: File | null = null;
  loading = false;
  saving = false;
  successMessage = '';
  errorMessage = '';
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadResumeData();
  }

  loadResumeData(): void {
    this.loading = true;
    this.errorMessage = '';
    
    this.authService.getProfile().subscribe({
      next: (response: any) => {
        console.log('Profile data received:', response);
        
        if (response.status && response.data) {
          const data = response.data;
          
          // User data
          this.name = data.user.name || '';
          this.email = data.user.email || '';
          this.location = data.user.location || '';
          this.aboutMe = data.user.summary || '';
          
          // Resume data - ensuring we have arrays
          this.experiences = Array.isArray(data.experience) ? data.experience : [];
          this.education = Array.isArray(data.education) ? data.education : [];
          this.skills = Array.isArray(data.skills) ? data.skills : [];
          
          // Ensure experiences and education have proper structure
          this.experiences = this.experiences.map(exp => ({
            company: exp.company || '',
            position: exp.position || '',
            from: exp.from || '',
            to: exp.to || ''
          }));
          
          this.education = this.education.map(edu => ({
            degree: edu.degree || '',
            field: edu.field || '',
            institution: edu.institution || '',
            year: edu.year || ''
          }));
          
          // Ensure skills is an array of strings
          this.skills = this.skills.map(skill => typeof skill === 'string' ? skill : '');
          
          if (data.resume_path) {
            this.resumeUrl = data.resume_path;
          }
        } else {
          this.errorMessage = 'Invalid response format from server';
        }
        
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading resume data:', err);
        this.loading = false;
        this.errorMessage = err.error?.message || 'Failed to load resume data. Please try again.';
      }
    });
  }

  saveChanges(): void {
    this.saving = true;
    this.successMessage = '';
    this.errorMessage = '';
    
    // Clean up the data to avoid any potential issues
    const cleanExperiences = this.experiences.map(exp => ({
      company: exp.company || '',
      position: exp.position || '',
      from: exp.from || '',
      to: exp.to || ''
    }));
    
    const cleanEducation = this.education.map(edu => ({
      degree: edu.degree || '',
      field: edu.field || '',
      institution: edu.institution || '',
      year: edu.year || ''
    }));
    
    const cleanSkills = this.skills.map(skill => 
      typeof skill === 'string' ? skill : String(skill)
    ).filter(skill => skill.trim() !== '');
    
    // Create the profile data object
    const profileData = {
      name: this.name,
      location: this.location,
      summary: this.aboutMe,
      experience: cleanExperiences,
      education: cleanEducation,
      skills: cleanSkills
    };
    
    console.log('Sending data to backend:', profileData);
    
    this.authService.updateProfile(profileData).subscribe({
      next: (response: any) => {
        console.log('Update success:', response);
        this.saving = false;
        this.successMessage = 'Resume updated successfully!';
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (err) => {
        console.error('Update error:', err);
        this.saving = false;
        this.errorMessage = err.error?.message || 'Failed to update resume. Please try again.';
      }
    });
  }

  addExperience() {
    this.experiences.push({ company: '', position: '', from: '', to: '' });
  }

  deleteExperience(index: number) {
    this.experiences.splice(index, 1);
  }

  addEducation() {
    this.education.push({ degree: '', field: '', institution: '', year: '' });
  }

  deleteEducation(index: number) {
    this.education.splice(index, 1);
  }

  addStrength() {
    this.skills.push('');
  }

  deleteStrength(index: number) {
    this.skills.splice(index, 1);
  }

  uploadResume() {
    this.showResumeModal = true;
  }

  handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.uploadedResumeFile = target.files[0];
    }
  }

  saveResume() {
    if (!this.uploadedResumeFile) {
      this.errorMessage = 'Please select a file to upload.';
      return;
    }
    
    this.saving = true;
    this.successMessage = '';
    this.errorMessage = '';
    
    this.authService.uploadResume(this.uploadedResumeFile).subscribe({
      next: (response: any) => {
        this.saving = false;
        this.showResumeModal = false;
        this.uploadedResumeFile = null;
        this.successMessage = 'Resume uploaded successfully!';
        
        // Update the resume URL if provided in the response
        if (response.data && response.data.resume_url) {
          this.resumeUrl = response.data.resume_url;
        }
        
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (err) => {
        console.error('Error uploading resume:', err);
        this.saving = false;
        this.errorMessage = err.error?.message || 'Failed to upload resume. Please try again.';
      }
    });
  }

  cancelResumeUpload() {
    this.showResumeModal = false;
    this.uploadedResumeFile = null;
  }
  
  // Navigate back to profile
  navigateToProfile() {
    this.router.navigate(['/jobseeker-profile']);
  }
}