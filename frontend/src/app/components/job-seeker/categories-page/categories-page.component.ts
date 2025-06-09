import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { NgClass, NgForOf, NgStyle, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../../navbar/navbar.component';
import { JobService } from '../../../services/jobs/job.service';

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
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.category = params['category'];
      if (this.category) {
        this.jobService.getJobsByCategory(this.category).subscribe(
          (data: any[]) => {
            this.jobs = data;
          },
          (error) => {
            console.error('Error loading jobs:', error);
          }
        );
      }
    });
  }

  toggleSave(event: Event, job: any) {
    event.stopPropagation();

    if (job.favorite_id) {
      this.jobService.removeSavedJob(job.id).subscribe({
        next: () => {
          job.favorite_id = null;
          job.saved = false;
        },
        error: (err) => console.error('Error removing saved job:', err)
      });
    } else {
      this.jobService.saveJob(job.id).subscribe({
        next: (response: any) => {
          job.favorite_id = response.id;
          job.saved = true;
        },
        error: (err) => console.error('Error saving job:', err)
      });
    }
  }

  goBack() {
    this.router.navigate(['/home-page']);
  }

  applyJob(job: any) {
    console.log('Applying for job:', job.title);
    this.router.navigate(['/application-review'], {
      queryParams: { jobId: job.id }
    });
  }
}
