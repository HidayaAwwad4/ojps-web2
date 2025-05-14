import {Component, Input} from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import {NotificationItemComponent} from '../notification-item/notification-item.component';

@Component({
  selector: 'app-notification-list',
  imports: [
    NgForOf,
    NotificationItemComponent,
    NgClass
  ],
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.css'
})
export class NotificationListComponent {

  groupedNotifications: any[] = [];

  private rawNotifications = [
    { title: 'Asal Company', avatar: 'assets/avatar2.jpg', message: 'You received a new update...', date: new Date(), opened: false },
    { title: 'ADHAM', avatar: 'assets/adham.jpg', message: 'Application received...', date: new Date(), opened: false },
    { title: 'New TERIC', avatar: 'assets/avatar2.jpg', message: 'Interview invitation...', date: new Date(), opened: true },
    { title: 'Fashion Store', avatar: 'assets/avatar2.jpg', message: 'Application update...', date: new Date(), opened: true },
    { title: 'TECH', avatar: 'assets/avatar2.jpg', message: 'Your job has been viewed...', date: new Date(new Date().setDate(new Date().getDate() - 3)), opened: true },
    { title: 'ARISO', avatar: 'assets/avatar2.jpg', message: 'Your application was rejected.', date: new Date(new Date().setDate(new Date().getDate() - 5)), opened: true }
  ];

  ngOnInit(): void {
    this.groupNotifications();
  }

  private groupNotifications() {
    const today = new Date();
    const isSameDay = (d1: Date, d2: Date) => d1.toDateString() === d2.toDateString();

    const newList = this.rawNotifications.filter(n => !n.opened);
    const todayList = this.rawNotifications.filter(n => n.opened && isSameDay(n.date, today));
    const weekList = this.rawNotifications.filter(n => n.opened && !isSameDay(n.date, today));

    this.groupedNotifications = [
      { title: 'New', items: newList },
      { title: 'Today', items: todayList },
      { title: 'This Week', items: weekList }
    ];
  }

  // Simulate opening a notification (e.g., when clicked)
  onOpenNotification(notification: any) {
    notification.opened = true;
    this.groupNotifications();
  }
}
