import {Component, Input} from '@angular/core';
import {NgForOf} from '@angular/common';
import {NotificationItemComponent} from '../notification-item/notification-item.component';

@Component({
  selector: 'app-notification-list',
  imports: [
    NgForOf,
    NotificationItemComponent
  ],
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.css'
})
export class NotificationListComponent {
  goBack() {

  }

  groupedNotifications: any[] = [];

  ngOnInit(): void {
    this.groupedNotifications = [
      {
        title: 'New',
        items: [
          { title: 'Asal Company', avatar: 'assets/avatar2.jpg', message: 'You received a new update...' },
          { title: 'ADHAM', avatar: 'assets/adham.jpg', message: 'Application received...' }
        ]
      },
      {
        title: 'Today',
        items: [
          { title: 'New TERIC', avatar: 'assets/avatar2.jpg', message: 'Interview invitation...' },
          { title: 'Fashion Store', avatar: 'assets/avatar2.jpg', message: 'Application update...' }
        ]
      },
      {
        title: 'This Week',
        items: [
          { title: 'TECH', avatar: 'assets/avatar2.jpg', message: 'Your job has been viewed...' },
          { title: 'ARISO', avatar: 'assets/avatar2.jpg', message: 'Your application was rejected.' }
        ]
      }
    ];
  }
}
