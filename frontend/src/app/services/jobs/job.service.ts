import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';


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

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): { headers: HttpHeaders } | {} {
    const token = this.authService.getToken();
    if (token) {
      return {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };
    }
    return {};
  }

  getRecommendedJobs(): Observable<any[]> {
    const token = this.authService.getToken();
    if (token) {
      return this.http.get<any[]>(`${this.apiUrl}/jobs/recommended`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
      });
    } else {
      return this.http.get<any[]>(`${this.apiUrl}/jobs/recommended-public`);
    }
  }

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

  saveJob(jobId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/favorites`, { job_id: jobId }, this.getAuthHeaders());
  }

  removeSavedJob(jobId: number) {
    return this.http.delete(`${this.apiUrl}/favorites/job/${jobId}`, this.getAuthHeaders());
  }

  getSavedJobs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/favorites/me`, this.getAuthHeaders());
  }

  searchJobs(query: string): Observable<any[]> {
    const options = {
      params: { query }
    };
    return this.http.get<any[]>(`${this.apiUrl}/search-jobs`, options);
  }

  getJobsByCategory(category: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/jobs/category/${category}`);
  }

  getApplicationsByJobSeekerId(jobSeekerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/applications/by-job-seeker/${jobSeekerId}`, this.getAuthHeaders());
  }

  getUserCV() {
    return this.http.get<{ cvFileName: string }>(
      `${this.apiUrl}/user/cv`,
      this.getAuthHeaders()
    );
  }

  submitApplication(formData: FormData) {
    return this.http.post(
      `${this.apiUrl}/applications/submit`,
      formData,
      this.getAuthHeaders()
    );
  }

}
