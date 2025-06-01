import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import moment from 'moment';
import {Notification} from '../../../models/notification.model';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private http: HttpClient) {
  }

  getAllNotifications(): Observable<any> {
    return this.http.get<any[]>('/api/notifications');
  }

  markAsRead(id: number) {
    return this.http.post(`/api/notifications/${id}/mark-as-read`, {});
  }

  private drawerVisible = new BehaviorSubject<boolean>(false);
  drawerVisible$ = this.drawerVisible.asObservable();

  toggleDrawer() {
    this.drawerVisible.next(!this.drawerVisible.getValue());
  }

}
