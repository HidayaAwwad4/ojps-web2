import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-notification-item',
  imports: [],
  templateUrl: './notification-item.component.html',
  styleUrl: './notification-item.component.css'
})
export class NotificationItemComponent {
  @Input() notification: any;

}
