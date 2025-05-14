import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-notification-item',
  imports: [],
  templateUrl: './notification-item.component.html',
  standalone: true,
  styleUrl: './notification-item.component.css'
})
export class NotificationItemComponent {
  @Input() notification: any;

}
