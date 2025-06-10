import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { NgClass, NgForOf, NgStyle, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../../navbar/navbar.component';
import { JobService } from '../../../services/jobs/job.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-categories-page',
  standalone: true,
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css'],
  imports: [
    CommonModule,
    NgClass,
    NgForOf,
    RouterLink,
    NgStyle,
    NavbarComponent,
    HttpClientModule
  ],
  providers: [JobService]
})
export class CategoriesPageComponent implements OnInit {
  user: any;

  jobs: any[] = [];
  category: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private jobService: JobService,
    private authService: AuthService

  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.category = params['category'];
      if (this.category) {
        this.jobService.getJobsByCategory(this.category).subscribe(
          (data: any[]) => {
            this.jobs = data;
          },
          function (error) {
            console.error('Error loading jobs:', error);
          }
        );
      }
    });
  }

  toggleSave(event: Event, job: any) {
    event.stopPropagation();

    if (job.saved) {
      this.jobService.removeSavedJob(job.id).subscribe({
        next: () => {
          job.saved = false;
        },
        error: err => console.error('Error removing saved job:', err)
      });
    } else {
      this.jobService.saveJob(job.id).subscribe({
        next: () => {
          job.saved = true;
        },
        error: err => console.error('Error saving job:', err)
      });
    }
  }

  goBack() {
    this.router.navigate(['/home-page']);
  }

  applyJob(job: any) {
    if (!this.authService.isLoggedIn()) {
      const confirmLogin = confirm('You need to log in first to apply for this job. Would you like to log in now?');

      if (confirmLogin) {
        this.router.navigate(['/login']);
      }

      return;
    }


    console.log('Applying for job:', job.title);
    this.router.navigate(['/application-review'], {
      queryParams: { jobId: job.id }
    });
  }

}
