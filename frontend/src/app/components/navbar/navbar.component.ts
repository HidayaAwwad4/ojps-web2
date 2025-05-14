import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {JobModalService} from '../../services/job-modal.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterLink, RouterLinkActive, NgClass],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() role: 'admin' | 'jobseeker' | 'employer' | 'guest' = 'guest';

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
  activeIcon: string = '';

  setActive(icon: string) {
    this.activeIcon = icon;
  }
}
