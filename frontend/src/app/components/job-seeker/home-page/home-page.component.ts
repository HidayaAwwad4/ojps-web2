import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../../../services/jobs/job.service';
import { RecommendedJobsComponent } from '../recommended-jobs/recommended-jobs.component';
import { JobCategoriesComponent } from '../job-category/job-category.component';
import { JobIntroComponent } from '../job-intro/job-intro.component';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './home-page.component.html',
  standalone: true,
  imports: [
    RecommendedJobsComponent,
    JobCategoriesComponent,
    JobIntroComponent,
    FormsModule,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./home-page.component.css']
})
export class HomepageComponent implements OnInit {
  searchText: string = '';
  searchResults: any[] = [];
  noResults: boolean = false;
  recommendedJobs: any[] = [];

  private searchTerms = new Subject<string>();

  constructor(private router: Router, private jobService: JobService) {}

  ngOnInit() {
    this.jobService.getRecommendedJobs().subscribe({
      next: (jobs: any[]) => {
        this.recommendedJobs = jobs;
      },
      error: (err) => {
        console.error('Error fetching recommended jobs:', err);
        this.recommendedJobs = [];
      }
    });
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.jobService.searchJobs(term))
    ).subscribe(results => {
      this.searchResults = results;
      this.noResults = results.length === 0 && this.searchText.trim().length > 0;
    });
  }

  onSearchChange() {
    const query = this.searchText.trim();
    if (query.length === 0) {
      this.searchResults = [];
      this.noResults = false;
      return;
    }
    this.searchTerms.next(query);
  }

  selectJob(job: any) {
    this.router.navigate(['/job-details', job.id]);
    this.searchResults = [];
    this.searchText = job.title;
  }

  handleJobClick(job: any) {
    this.selectJob(job);
  }
}
