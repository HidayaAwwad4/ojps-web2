import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-stat-cards',
  templateUrl: './stat-cards.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./stat-cards.component.css']
})
export class StatCardsComponent implements OnInit {
  stats = [
    { label: 'Registered Users', icon: 'bi bi-people-fill', value: 0 },
    { label: 'Number of Job Seekers', icon: 'bi bi-person-badge', value: 0 },
    { label: 'Number of Employers', icon: 'bi bi-building', value: 0 },
    { label: 'Jobs Posted', icon: 'bi bi-briefcase-fill', value: 0 },
    { label: 'Requests Accepted', icon: 'bi bi-check-circle-fill', value: 0 },
    { label: 'Requests Rejected', icon: 'bi bi-x-circle-fill', value: 0 }
  ];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchStats();
  }

  fetchStats(): void {
    this.adminService.getTotalUsers().subscribe(res => {
      this.stats[0].value = res.total_users;
    });

    this.adminService.getTotalJobSeekers().subscribe(res => {
      this.stats[1].value = res.total_job_seekers;
    });

    this.adminService.getTotalEmployers().subscribe(res => {
      this.stats[2].value = res.total_employers;
    });

    this.adminService.getTotalJobListings().subscribe(res => {
      this.stats[3].value = res.total_job_listings;
    });

    this.adminService.getAcceptedApplications().subscribe(res => {
      this.stats[4].value = res.accepted_requests;
    });

    this.adminService.getRejectedApplications().subscribe(res => {
      this.stats[5].value = res.rejected_requests;
    });
  }
}
