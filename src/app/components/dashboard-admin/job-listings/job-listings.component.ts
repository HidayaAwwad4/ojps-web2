import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-job-listings',
  templateUrl: './job-listings.component.html',
  styleUrls: ['./job-listings.component.css'],
  standalone: true,
  imports: [NgForOf, FormsModule]
})
export class JobListingsComponent {
  constructor(private location: Location) {}

  searchTerm = '';
  selectedJob: any = null;

  jobs = [
    { title: 'Web Designer', employer: 'Mohammad Husain', location: 'Nablus', date: '2023-07-02' },
    { title: 'Graphic Designer', employer: 'Hidaya Awwad', location: 'Ramallah', date: '2024-07-22' },
    { title: 'Web Developer', employer: 'Islam Sadaldeen', location: 'Ramallah', date: '2025-01-28' },
    { title: 'Photographer', employer: 'Razan abudaia', location: 'Jerusalem', date: '2023-06-06' },
    { title: 'quality assurance', employer: 'Tasneem jber', location: 'Nablus', date: '2024-12-09' },
    { title: 'Data analysis', employer: 'Haneen Akobeh', location: 'Ramallah', date: '2025-09-17' }
  ];

  filteredJobs() {
    return this.jobs.filter(job =>
      job.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      job.employer.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openConfirmModal(job: any) {
    this.selectedJob = job;
    const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
    modal.show();
  }

  confirmDelete() {
    if (this.selectedJob) {
      this.jobs = this.jobs.filter(j => j !== this.selectedJob);
    }
    this.selectedJob = null;
  }

  goBack() {
    this.location.back();
  }
}
