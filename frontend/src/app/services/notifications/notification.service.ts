import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

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

  getAllNotifications(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/notifications`, this.getAuthHeaders()).pipe(
      map(response => {
        if (response && Array.isArray(response.notifications)) {
          return response.notifications;
        } else {
          console.error('Expected notifications to be an array but got:', response);
          return [];
        }
      }),
      catchError(error => {
        console.error('Error fetching notifications:', error);
        return of([]);
      })
    );
  }

  markAsRead(id: number) {
    return this.http.post(`${this.apiUrl}/notifications/${id}/mark-as-read`, {}, this.getAuthHeaders());
  }

  private drawerVisible = new BehaviorSubject<boolean>(false);
  drawerVisible$ = this.drawerVisible.asObservable();

  toggleDrawer() {
    this.drawerVisible.next(!this.drawerVisible.getValue());
  }
}
