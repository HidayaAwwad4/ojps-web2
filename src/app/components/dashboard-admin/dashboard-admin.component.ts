import { Component, HostListener, OnInit } from '@angular/core';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { StatCardsComponent } from "./stat-cards/stat-cards.component";
import { JobOverviewComponent } from "./job-overview/job-overview.component";
import { JobTableComponent } from "./job-table/job-table.component";
import { RecommendedJobsComponent } from "./recommended-jobs/recommended-jobs.component";
import { FooterComponent } from "./footer/footer.component";
import { NgClass, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [
    SidebarComponent,
    StatCardsComponent,
    JobOverviewComponent,
    JobTableComponent,
    RecommendedJobsComponent,
    FooterComponent,
    NgClass,
    NgIf,
    RouterOutlet
  ],
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  sidebarOpen = false;
  isDesktopView = false;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.isDesktopView = window.innerWidth >= 972;
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  @HostListener('window:resize')
  onResize() {
    if (typeof window !== 'undefined') {
      this.isDesktopView = window.innerWidth >= 972;
      if (this.isDesktopView) {
        this.sidebarOpen = false;
      }
    }
  }

  closeSidebar() {
    if (!this.isDesktopView) {
      this.sidebarOpen = false;
    }
  }

  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }
}
