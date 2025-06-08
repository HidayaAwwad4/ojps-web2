import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  last_page: number;
  per_page: number;
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getEmployerByUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/employer`, { headers });
  }

  getJobsByEmployer(employerId: number, page: number = 1): Observable<PaginatedResponse<any>> {
    const token = localStorage.getItem('token');
    return this.http.get<PaginatedResponse<any>>(`${this.apiUrl}/employer/${employerId}/jobs?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }


  getJobById(jobId: number): Observable<any> {
      return this.http.get(`${this.apiUrl}/jobs/${jobId}`);
    }

  createJob(jobData: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.apiUrl}/jobs`, jobData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getJobFormOptions() {
    return this.http.get<any>(`${this.apiUrl}/job-form-options`);
  }

  updateJob(jobId: number, jobData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    jobData.append('_method', 'PUT');
    return this.http.post(`${this.apiUrl}/jobs/${jobId}`, jobData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updateJobStatus(jobId: number, isOpened: boolean): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put(`${this.apiUrl}/jobs/${jobId}/status`, { isOpened }, { headers });
  }

  deleteJob(jobId: number): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.apiUrl}/jobs/${jobId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
  getApplicantsByJobId(jobId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/applications/job/${jobId}`);
  }
  updateApplicationStatus(applicationId: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/applications/${applicationId}`, { status });
  }

}
