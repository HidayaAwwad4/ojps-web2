import { Component } from '@angular/core';
import {NotificationListComponent} from '../notification-list/notification-list.component';
@Component({
  selector: 'app-seeker-notification',
  imports: [
    NotificationListComponent,
  ],
  templateUrl: './seeker-notification.component.html',
  standalone: true,
  styleUrl: './seeker-notification.component.css'
})
export class SeekerNotificationComponent {

}
