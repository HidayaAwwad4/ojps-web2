import {Component, Input} from '@angular/core';
import {NotificationListComponent} from '../notification-list/notification-list.component';
@Component({
  selector: 'app-employer-notification',
  imports: [
    NotificationListComponent,
  ],
  templateUrl: './employer-notification.component.html',
  standalone: true,
  styleUrl: './employer-notification.component.css'
})
export class EmployerNotificationComponent {
  @Input() notifications: any[] = [];
}
