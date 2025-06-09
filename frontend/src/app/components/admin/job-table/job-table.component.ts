import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-job-table',
  templateUrl: './job-table.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./job-table.component.css']
})
export class JobTableComponent implements OnInit {
  jobData: any[] = [];
  paginatedData: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  pages: number[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getJobOverviewTable().subscribe(data => {
      this.jobData = data;
      this.setupPagination();
      this.setPage(1);
    });
  }

  setupPagination() {
    const pageCount = Math.ceil(this.jobData.length / this.itemsPerPage);
    this.pages = [];
    for(let i = 1; i <= pageCount; i++) {
      this.pages.push(i);
    }
  }

  setPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = this.jobData.slice(startIndex, endIndex);
  }

  protected readonly Math = Math;
}
