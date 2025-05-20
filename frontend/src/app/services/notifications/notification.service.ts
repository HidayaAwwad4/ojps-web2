import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  private drawerVisible = new BehaviorSubject<boolean>(false);
  drawerVisible$ = this.drawerVisible.asObservable();

  toggleDrawer() {
    this.drawerVisible.next(!this.drawerVisible.getValue());
  }
  getNotifications(): Observable<any> {
    return this.http.get('/api/notifications');
  }
}
