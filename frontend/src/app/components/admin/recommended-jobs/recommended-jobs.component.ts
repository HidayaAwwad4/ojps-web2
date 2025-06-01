import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-recommended-jobs',
  templateUrl: './recommended-jobs.component.html',
  styleUrl: './recommended-jobs.component.css',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    NgIf
  ]
})
export class RecommendedJobsComponent implements OnInit {
  recommendedJobs: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadLatestJobs();
  }

  loadLatestJobs(): void {
    this.adminService.getLatestJobListings().subscribe({
      next: (jobs) => {
        this.recommendedJobs = jobs;
      },
      error: (err) => {
        console.error('Error fetching latest jobs:', err);
      }
    });
  }
}
