import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { JobCardComponent } from '../job-card/job-card.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { AuthService } from '../../../services/auth/auth.service';

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
  loading = true;
  error = false;

  jobs = [
    {
      image: 'assets/adham.jpg',
      title: 'Full-Stack Developer',
      description: 'Responsible for developing both front-end and back-end systems.',
      salary: '$800 - $1000 Salary/Month',
      status: 'open'
    },
    {
      image: 'assets/adham.jpg',
      title: 'UI/UX Designer',
      description: 'Focus on crafting intuitive and visually appealing user interfaces.',
      salary: '$700 - $900 Salary/Month',
      status: 'open'
    },
    {
      image: 'assets/adham.jpg',
      title: 'Mobile App Developer',
      description: 'Build and maintain cross-platform mobile applications.',
      salary: '$750 - $950 Salary/Month',
      status: 'open'
    },
    {
      image: 'assets/adham.jpg',
      title: 'Data Analyst',
      description: 'Analyze data trends and create reports.',
      salary: '$850 - $1050 Salary/Month',
      status: 'open'
    },
    {
      image: 'assets/adham.jpg',
      title: 'UI Designer',
      description: 'Focus on crafting intuitive and visually appealing user interfaces.',
      salary: '$700 - $900 Salary/Month',
      status: 'closed'
    },
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProfileData();
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

          // Basic user info
          this.name = data.user?.name || '';
          this.email = data.user?.email || '';
          this.location = data.user?.location || 'No location specified';
          this.aboutMe = data.user?.summary || 'No summary provided';

          console.log('Final employer component data:', {
            name: this.name,
            email: this.email,
            location: this.location,
            aboutMe: this.aboutMe
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

  navigateToEditProfile(): void {
    this.router.navigate(['/edit-profile']);
  }

  closeJob(job: any) {
    job.status = 'closed';
  }
}