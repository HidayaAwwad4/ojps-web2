import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';
import {Notification} from '../../../../models/notification.model';

@Component({
  selector: 'app-notification-item',
  imports: [
    NgClass
  ],
  templateUrl: './notification-item.component.html',
  standalone: true,
  styleUrl: './notification-item.component.css'
})
export class NotificationItemComponent {
  @Input() notification!: Notification;
  @Input() isNew: boolean = false;

  getAvatarUrl(avatar?: string): string {
    return avatar === 'default-avatar' || !avatar
      ? 'assets/account-avatar.png'
      : avatar;
  }
}
