import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-job-table',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './job-table.component.html',
  styleUrls: ['./job-table.component.css']
})
export class JobTableComponent {
  jobData = [
    { id: 1, title: 'Web Designer', employer: 'Mohammad Husain', location: 'Nablus', date: '2023-07-02' },
    { id: 2, title: 'Graphic Designer', employer: 'Hidaya Awwad', location: 'Ramallah', date: '2023-07-06' },
    { id: 3, title: 'Web Developer', employer: 'Islam Saadideen', location: 'Ramallah', date: '2025-01-28' },
    { id: 4, title: 'Photographer', employer: 'Razan abudaia', location: 'Jerusalem', date: '2023-04-02' },
    { id: 5, title: 'Quality Assurance', employer: 'Tasneem jber', location: 'Nablus', date: '2024-12-09' },
    { id: 6, title: 'Data Analyst', employer: 'Haneen Akobeh', location: 'Ramallah', date: '2025-09-17' },
    { id: 7, title: 'Web Designer', employer: 'Mohammad Husain', location: 'Nablus', date: '2023-07-02' },
    { id: 8, title: 'Graphic Designer', employer: 'Hidaya Awwad', location: 'Ramallah', date: '2023-07-06' },
    { id: 9, title: 'Web Developer', employer: 'Islam Saadideen', location: 'Ramallah', date: '2025-01-28' },
    { id: 10, title: 'Photographer', employer: 'Razan abudaia', location: 'Jerusalem', date: '2023-04-02' },
    { id: 11, title: 'Quality Assurance', employer: 'Tasneem jber', location: 'Nablus', date: '2024-12-09' },
    { id: 12, title: 'Data Analyst', employer: 'Haneen Akobeh', location: 'Ramallah', date: '2025-09-17' },
  ];

  currentPage = 1;
  itemsPerPage = 6;
  get paginatedData() {
    const slicedJobs = this.jobData.slice(0, 12);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return slicedJobs.slice(start, start + this.itemsPerPage);
  }
  get totalPages() {
    return Math.ceil(12 / this.itemsPerPage);
  }
  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  get pages() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  protected readonly Math = Math;
}
