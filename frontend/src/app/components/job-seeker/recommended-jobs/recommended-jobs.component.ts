import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit } from '@angular/core';
import { JobService } from '../../../services/jobs/job.service';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-recommended-jobs',
  templateUrl: './recommended-jobs.component.html',
  styleUrls: ['./recommended-jobs.component.css'],
  imports: [
    NgForOf,
    RouterLink
  ],
  standalone: true
})
export class RecommendedJobsComponent implements OnInit {
   jobs: any[] = [];

  @Output() jobClicked = new EventEmitter<any>();
  @ViewChild('carousel', { static: true }) carousel!: ElementRef;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadRecommendedJobs();
  }

  loadRecommendedJobs() {
    this.jobService.getRecommendedJobs().subscribe({
      next: (jobs) => {
        this.jobs = jobs;
        console.log('Recommended jobs loaded:', jobs);
      },
      error: (err) => {
        if (err.status === 404) {
          console.log('No recommended jobs found');
          this.jobs = [];
        } else {
          console.error('Failed to load recommended jobs', err);
        }
      }
    });

  }

  onJobClick(job: any) {
    this.jobClicked.emit(job);
  }

  scrollLeft() {
    this.carousel.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.carousel.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }
}
