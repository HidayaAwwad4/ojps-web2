import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import {NotificationItemComponent} from '../notification-item/notification-item.component';
import {NotificationService} from '../../../services/notifications/notification.service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [
    NgForOf,
    NotificationItemComponent,
    NgClass
  ],
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.css'
})
export class NotificationListComponent implements OnInit{

  groupedNotifications: any[] = [];

  constructor(private notificationService: NotificationService ,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  private loadNotifications() {
    this.notificationService.getAllNotifications().subscribe((notifications: any[]) => {
      this.groupNotifications(notifications);
    });
  }
  private groupNotifications(notifications: any[]) {
    const today = new Date();
    const isSameDay = (d1: Date, d2: Date) =>
      new Date(d1).toDateString() === new Date(d2).toDateString();

    const newList = notifications.filter(n => !n.is_read);
    const todayList = notifications.filter(n => n.is_read && isSameDay(n.created_at, today));
    const weekList = notifications.filter(n => n.is_read && !isSameDay(n.created_at, today));

    this.groupedNotifications = [
      { title: 'New', items: newList },
      { title: 'Today', items: todayList },
      { title: 'This Week', items: weekList }
    ];
  }

  onOpenNotification(notification: any) {
   if (!notification.is_read) {
     this.notificationService.markAsRead(notification.id).subscribe(() => {
       notification.is_read = true;
       this.navigateTo(notification.redirect_url || '/');
       this.loadNotifications();
     });
   }else {
     this.navigateTo(notification.redirect_url || '/');
   }
  }
  private navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }
}
