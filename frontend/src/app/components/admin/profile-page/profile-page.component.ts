import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { AuthService } from '../../../services/auth/auth.service';

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
export class AdminProfilePageComponent implements OnInit {
  name = '';
  email = '';
  location = '';
  aboutMe = '';
  profilePictureUrl = 'assets/account-avatar.png'; // Default avatar
  loading = true;
  error = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProfileData();
  }

  loadProfileData(): void {
    this.loading = true;
    console.log('=== LOADING ADMIN PROFILE DATA START ===');
    
    this.authService.getProfile().subscribe({
      next: (response: any) => {
        console.log('Raw admin profile response:', JSON.stringify(response, null, 2));
        
        if (response.status && response.data) {
          const data = response.data;

          console.log('Admin profile data extracted:', data);
          console.log('Profile picture URL:', data.user?.profile_picture_url);

          // Basic user info
          this.name = data.user?.name || '';
          this.email = data.user?.email || '';
          this.location = data.user?.location || 'No location specified';
          this.aboutMe = data.user?.summary || 'No summary provided';
          
          // Profile picture - use uploaded picture if available, otherwise default
          this.profilePictureUrl = data.user?.profile_picture_url || 'assets/account-avatar.png';

          console.log('Final admin component data:', {
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

        console.log('=== LOADING ADMIN PROFILE DATA END ===');
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading admin profile:', err);
        this.loading = false;
        this.error = true;
      }
    });
  }

  navigateToEditProfile(): void {
    this.router.navigate(['/edit-profile']);
  }
}