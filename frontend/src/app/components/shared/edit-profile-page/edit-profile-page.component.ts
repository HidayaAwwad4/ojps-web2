import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-edit-profile-page',
  standalone: true,
  imports: [
    NavbarComponent,
    FormsModule,
    CommonModule
  ],
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.css']
})
export class EditProfilePageComponent implements OnInit {
  // User data
  name: string = '';
  email: string = '';
  location: string = '';
  aboutMe: string = '';
  userRole: string = '';
  
  // Password fields
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  
  // UI states
  loading: boolean = true;
  saving: boolean = false;
  error: string | null = null;
  successMessage: string | null = null;
  profilePictureFile: File | null = null;
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.loadUserData();
  }
  
  loadUserData(): void {
    this.loading = true;
    this.error = null;
    
    this.authService.getProfile().subscribe({
      next: (response: any) => {
        if (response.status && response.data) {
          const userData = response.data.user;
          this.name = userData.name || '';
          this.email = userData.email || '';
          this.location = userData.location || '';
          this.aboutMe = userData.summary || '';
          this.userRole = userData.role?.name || '';
          
          console.log('Edit profile loaded for user role:', this.userRole);
        } else {
          this.error = 'Invalid response format from server';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading profile data:', err);
        this.error = 'Failed to load profile data. Please try again.';
        this.loading = false;
      }
    });
  }
  
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.profilePictureFile = file;
      this.uploadProfilePicture();
    }
  }
  
  uploadProfilePicture(): void {
    if (!this.profilePictureFile) return;
    
    this.saving = true;
    this.authService.uploadProfilePicture(this.profilePictureFile).subscribe({
      next: (response: any) => {
        this.successMessage = 'Profile picture updated successfully!';
        setTimeout(() => this.successMessage = null, 3000);
        this.saving = false;
      },
      error: (err) => {
        console.error('Error uploading profile picture:', err);
        this.error = 'Failed to upload profile picture. Please try again.';
        this.saving = false;
      }
    });
  }
  
  saveChanges(): void {
    this.saving = true;
    this.error = null;
    this.successMessage = null;
    
    // Basic profile data
    const profileData: any = {
      name: this.name,
      location: this.location,
      summary: this.aboutMe
    };
    
    // First update profile data
    this.authService.updateProfile(profileData).subscribe({
      next: (response: any) => {
        // If also changing password
        if (this.currentPassword && this.newPassword) {
          this.updatePassword();
        } else {
          this.successMessage = 'Profile updated successfully!';
          this.saving = false;
          setTimeout(() => this.successMessage = null, 3000);
        }
      },
      error: (err) => {
        console.error('Error updating profile:', err);
        this.error = err.error?.message || 'Failed to update profile. Please try again.';
        this.saving = false;
      }
    });
  }
  
  updatePassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.error = 'New password and confirmation do not match';
      this.saving = false;
      return;
    }
    
    this.authService.updatePassword(this.currentPassword, this.newPassword, this.confirmPassword).subscribe({
      next: (response: any) => {
        this.successMessage = 'Profile and password updated successfully!';
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
        this.saving = false;
        setTimeout(() => this.successMessage = null, 3000);
      },
      error: (err) => {
        console.error('Error updating password:', err);
        this.error = err.error?.message || 'Failed to update password. Current password may be incorrect.';
        this.saving = false;
      }
    });
  }
  
  cancel(): void {
    switch (this.userRole) {
      case 'Job Seeker':
        this.router.navigate(['/jobseeker-profile']);
        break;
      case 'Employer':
        this.router.navigate(['/employer-profile']);
        break;
      case 'Admin':
        this.router.navigate(['/admin-profile']);
        break;
      default:
        this.router.navigate(['/profile']);
        break;
    }
  }
}