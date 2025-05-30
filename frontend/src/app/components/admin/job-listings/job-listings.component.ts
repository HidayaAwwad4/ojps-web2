import { Component, OnInit } from '@angular/core';
import { DatePipe, Location, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { AdminService } from '../../../services/admin/admin.service';
import { debounceTime, Subject } from 'rxjs';

declare var bootstrap: any;

@Component({
  selector: 'app-job-listings',
  templateUrl: './job-listings.component.html',
  styleUrls: ['./job-listings.component.css'],
  standalone: true,
  imports: [NgForOf, FormsModule, DatePipe, NgIf]
})
export class JobListingsComponent implements OnInit {
  constructor(private location: Location, private adminService: AdminService) {}

  searchTerm = '';
  searchSubject = new Subject<string>();
  selectedJob: any = null;
  jobs: any[] = [];
  mostDemandedJobs: any[] = [];

  ngOnInit(): void {
    this.fetchJobs();
    this.fetchJobDemandStats();

    this.searchSubject.pipe(debounceTime(300)).subscribe(term => {
      this.fetchJobs(term);
    });
  }

  fetchJobs(searchTerm: string = '') {
    this.adminService.getJobListings(searchTerm).subscribe({
      next: (data) => {
        this.jobs = data;
      },
      error: (err) => {
        console.error('Failed to fetch job listings:', err);
      }
    });
  }

  fetchJobDemandStats() {
    this.adminService.getJobDemandStats().subscribe({
      next: (data) => {
        this.mostDemandedJobs = data.most_posted;
      },
      error: (err) => {
        console.error('Failed to fetch job posting stats:', err);
      }
    });
  }

  onSearchChange() {
    this.searchSubject.next(this.searchTerm);
  }

  openConfirmModal(job: any) {
    this.selectedJob = job;
    const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
    modal.show();
  }

  confirmDelete() {
    if (this.selectedJob) {
      this.adminService.deleteJobListing(this.selectedJob.id).subscribe({
        next: () => {
          this.fetchJobs(this.searchTerm);
          this.selectedJob = null;
          alert('Job listing deleted successfully!');
        },
        error: (err) => {
          console.error('Error deleting job listing:', err);
        }
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
