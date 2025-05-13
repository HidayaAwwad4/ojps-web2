import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {JobModalService} from '../../services/job-modal.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() role: 'admin' | 'jobseeker' | 'employer' = 'jobseeker';

  @Output() notificationClick = new EventEmitter<void>();

  constructor(private jobModalService: JobModalService
  ) {}

  openJobModal() {
    this.jobModalService.openCreateJobModal();
  }

  onNotificationClick() {
    console.log('Notification icon clicked');
    this.notificationClick.emit();
  }

}
