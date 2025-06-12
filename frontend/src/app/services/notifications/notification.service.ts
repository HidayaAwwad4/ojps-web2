import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Notification } from '../../../models/notification.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): { headers: HttpHeaders } | {} {
    const token = localStorage.getItem('token');
    if (token) {
      return {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };
    }
    return {};
  }

  getAllNotifications(): Observable<{ notifications: any[] }> {
    return this.http.get<{ notifications: any[] }>(`${this.apiUrl}/notifications`, this.getAuthHeaders());
  }



  markAsRead(id: number) {
    return this.http.post(`${this.apiUrl}/notifications/mark-as-read/${id}`, {}, this.getAuthHeaders());
  }



  private drawerVisible = new BehaviorSubject<boolean>(false);
  drawerVisible$ = this.drawerVisible.asObservable();

  toggleDrawer() {
    this.drawerVisible.next(!this.drawerVisible.getValue());
  }
}
