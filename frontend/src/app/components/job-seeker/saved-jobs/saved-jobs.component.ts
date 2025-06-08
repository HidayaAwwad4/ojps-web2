import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location, NgClass, NgForOf} from '@angular/common';
import { JobService } from '../../../services/jobs/job.service';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  imports: [
    NgForOf,
    NgClass
  ],
  styleUrls: ['./saved-jobs.component.css']
})
export class SavedJobsComponent implements OnInit {
  savedJobs: any[] = [];

  constructor(
    private router: Router,
    private location: Location,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.fetchSavedJobs();
  }

  fetchSavedJobs(): void {
    this.jobService.getSavedJobs().subscribe({
      next: (response) => {
        this.savedJobs = response.map((fav: any) => ({
          ...fav.job,
          favorite_id: fav.id
        }));
      },
      error: (err) => {
        console.error('Error fetching saved jobs:', err);
      }
    });
  }

  toggleSave(event: Event, job: any) {
    event.stopPropagation();

    if (job.favorite_id) {
      this.jobService.removeSavedJob(job.id).subscribe({
        next: () => {
          job.favorite_id = null;
        },
        error: (err) => console.error('Error removing saved job:', err)
      });
    } else {
      this.jobService.saveJob(job.id).subscribe({
        next: (response: any) => {
          job.favorite_id = response.id;
        },
        error: (err) => console.error('Error saving job:', err)
      });
    }
  }




  goBack() {
    this.location.back();
  }

  applyJob(job: any) {
    console.log('Applying for job:', job.title);
    this.router.navigate(['/application-review']);
  }
}
