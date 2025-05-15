import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf, NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { JobModalService } from '../../services/job-modal.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterLink, RouterLinkActive, NgClass],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  role: 'admin' | 'jobseeker' | 'employer' | 'guest' = 'guest';

  @Output() notificationClick = new EventEmitter<void>();

  constructor(
    private jobModalService: JobModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const url = this.router.url;

    if (url.startsWith('/home/guest')) {
      this.role = 'guest';
    } else if (
      url.startsWith('/home-page') ||
      url.startsWith('/jobseeker-profile') ||
      url.startsWith('/Saved-Jobs') ||
      url.startsWith('/applications-status')
    ) {
      this.role = 'jobseeker';
    } else if (
      url.startsWith('/employer-home') ||
      url.startsWith('/employer-profile') ||
      url.startsWith('/employer/job-postings')
    ) {
      this.role = 'employer';
    } else {
      this.role = 'admin';
    }
  }

  openJobModal() {
    this.jobModalService.openCreateJobModal();
  }

  onNotificationClick() {
    this.notificationClick.emit();
  }

  activeIcon: string = '';
  setActive(icon: string) {
    this.activeIcon = icon;
  }
}
