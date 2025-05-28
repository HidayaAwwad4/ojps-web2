import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

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

  getJobsByEmployer(employerId: number): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}/employer/${employerId}/jobs`, {
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

  updateJob(jobId: number, jobData: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(`${this.apiUrl}/jobs/${jobId}`, jobData, {
      headers: { Authorization: `Bearer ${token}` }
    });
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
