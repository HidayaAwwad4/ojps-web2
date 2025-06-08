import {Component, Input, OnInit} from '@angular/core';
import {SeekerNotificationComponent} from '../seeker-notification/seeker-notification.component';
import {EmployerNotificationComponent} from '../employer-notification/employer-notification.component';
import {NgIf} from '@angular/common';
import {NotificationService} from '../../../services/notifications/notification.service';
@Component({
  selector: 'app-notification-drawer',
  standalone: true,
  imports: [
    SeekerNotificationComponent,
    EmployerNotificationComponent,
    NgIf
  ],
  templateUrl: './notification-drawer.component.html',
  styleUrl: './notification-drawer.component.css'
})
export class NotificationDrawerComponent implements OnInit {

  isOpen = false;
  @Input() userType: 'seeker' | 'employer' | null = null;
  @Input() userType: 'job-seeker' | 'employer' | null = null;

  notifications: any[] = [];

  constructor(
    private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.drawerVisible$.subscribe((visible) => {
      this.isOpen = visible;

      if (visible) {
        this.fetchNotifications();
      }
    });
  }

  fetchNotifications(): void {
    this.notificationService.getAllNotifications().subscribe({
      next: (data) => {
        this.notifications = data;
      },
      error: (err) => {
        console.error('Error fetching notifications:', err);
      }
    });
  }

}
