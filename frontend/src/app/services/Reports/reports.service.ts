import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
private apiUrl = '/api/reports';
  constructor(private http: HttpClient) { }

  getAdminStats(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/admin-stats`);
  }

  getEmployerStats(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/employer-stats`);
  }

  getAdminBarchartData(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/admin-bar-chart`);
  }

  getEmployeeLineChartData(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/employer-Line-chart`);
  }
}
