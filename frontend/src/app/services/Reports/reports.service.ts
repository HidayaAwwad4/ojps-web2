import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private apiUrl = 'http://127.0.0.1:8000/api/reports';

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

  getAdminStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin-stats`, this.getAuthHeaders());
  }

  getEmployerStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/employer-stats`, this.getAuthHeaders());
  }

  getAdminBarchartData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin-bar-chart`, this.getAuthHeaders());
  }

  getEmployeeLineChartData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/employer-Line-chart`, this.getAuthHeaders());
  }
}
