import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';

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
  @Input() notification: any;
  @Input() isNew: boolean = false;
}
