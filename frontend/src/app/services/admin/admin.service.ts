import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
  }

  getUsers(searchTerm: string = ''): Observable<any[]> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('search', searchTerm);
    }
    return this.http.get<any[]>(`${this.apiUrl}/admin/users`, {
      headers: this.getAuthHeaders(),
      params: params
    });
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/users`, user, {
      headers: this.getAuthHeaders()
    });
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin/users/${id}`, user, {
      headers: this.getAuthHeaders()
    });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/users/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  getJobListings(searchTerm: string = ''): Observable<any[]> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('search', searchTerm);
    }
    return this.http.get<any[]>(`${this.apiUrl}/admin/job-listings`, {
      headers: this.getAuthHeaders(),
      params
    });
  }

  deleteJobListing(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/job-listings/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  getJobDemandStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/job-stats`, {
      headers: this.getAuthHeaders()
    });
  }

  getTotalUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/user-count`, {
      headers: this.getAuthHeaders()
    });
  }

  getTotalEmployers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/employer-count`, {
      headers: this.getAuthHeaders()
    });
  }

  getTotalJobSeekers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/job-seeker-count`, {
      headers: this.getAuthHeaders()
    });
  }

  getTotalJobListings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/job-listing-count`, {
      headers: this.getAuthHeaders()
    });
  }

  getAcceptedApplications(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/accepted-applications`, {
      headers: this.getAuthHeaders()
    });
  }

  getRejectedApplications(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/rejected-applications`, {
      headers: this.getAuthHeaders()
    });
  }

  getLatestJobListings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/latest-jobs`, {
      headers: this.getAuthHeaders()
    });
  }

  getJobOverviewTable(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/job-overview-table`, {
      headers: this.getAuthHeaders()
    });
  }

  getPendingEmployers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/employers/pending`, {
      headers: this.getAuthHeaders()
    });
  }

  approveEmployer(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/employers/${id}/approve`, {}, {
      headers: this.getAuthHeaders()
    });
  }

  rejectEmployer(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/employers/${id}/reject`, {}, {
      headers: this.getAuthHeaders()
    });
  }

  getApplicationsStats(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/applications-stats`, {
      headers: this.getAuthHeaders()
    });
  }
}
