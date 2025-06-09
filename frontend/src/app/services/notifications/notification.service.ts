import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Notification} from '../../../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) {
  }

  getAllNotifications(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/notifications`);
  }



  markAsRead(id: number) {
    return this.http.post(`${this.apiUrl}/notifications/${id}/mark-as-read`, {});
  }

  private drawerVisible = new BehaviorSubject<boolean>(false);
  drawerVisible$ = this.drawerVisible.asObservable();

  toggleDrawer() {
    this.drawerVisible.next(!this.drawerVisible.getValue());
  }

}
