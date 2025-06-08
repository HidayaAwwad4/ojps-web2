import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

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
    return this.http.get<any[]>(`${this.apiUrl}/jobs/recommended`, this.getAuthHeaders());
  }

  getEmployerByUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/employer`, this.getAuthHeaders());
  }

  getJobsByEmployer(employerId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/employer/${employerId}/jobs`, this.getAuthHeaders());
  }

  getJobById(jobId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/jobs/${jobId}`);
  }

  createJob(jobData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/jobs`, jobData, this.getAuthHeaders());
  }

  getJobFormOptions() {
    return this.http.get<any>(`${this.apiUrl}/job-form-options`);
  }

  updateJob(jobId: number, jobData: FormData): Observable<any> {
    jobData.append('_method', 'PUT');
    return this.http.post(`${this.apiUrl}/jobs/${jobId}`, jobData, this.getAuthHeaders());
  }

  updateJobStatus(jobId: number, isOpened: boolean): Observable<any> {
    const token = this.authService.getToken() || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.put(`${this.apiUrl}/jobs/${jobId}/status`, { isOpened }, { headers });
  }

  deleteJob(jobId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/jobs/${jobId}`, this.getAuthHeaders());
  }

  getApplicantsByJobId(jobId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/applications/job/${jobId}`);
  }

  updateApplicationStatus(applicationId: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/applications/${applicationId}`, { status });
  }

  getJobsByCategory(category: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/jobs/category/${category}`);
  }

  getSavedJobs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/favorites/me`, this.getAuthHeaders());
  }

  searchJobs(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search-jobs`, {
      params: { query }
    });
  }

  saveJob(jobId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/favorites`, { job_id: jobId }, this.getAuthHeaders());
  }

  removeSavedJob(jobId: number) {
    return this.http.delete(`${this.apiUrl}/favorites/job/${jobId}`, this.getAuthHeaders());
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

