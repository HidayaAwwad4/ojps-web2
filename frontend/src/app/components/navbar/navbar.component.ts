import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf, NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { JobModalService } from '../../services/jobs/job-modal.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterLink, RouterLinkActive, ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  role: 'admin' | 'job-seeker' | 'employer' | 'guest' = 'guest';

  @Output() notificationClick = new EventEmitter<void>();

  constructor(
    private jobModalService: JobModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const storedRole = localStorage.getItem('role');
    if (storedRole === 'admin' || storedRole === 'job-seeker' || storedRole === 'employer') {
      this.role = storedRole;
    } else {
      this.role = 'guest';
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
