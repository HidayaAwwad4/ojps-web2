import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getJobsByEmployer(employerId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/employer/${employerId}/jobs`);
  }

  getJobById(jobId: number): Observable<any> {
      return this.http.get(`${this.apiUrl}/jobs/${jobId}`);
    }

  createJob(jobData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/jobs`, jobData);
  }

  getJobFormOptions() {
    return this.http.get<any>(`${this.apiUrl}/job-form-options`);
  }

  updateJob(jobId: number, jobData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/jobs/${jobId}`, jobData);
  }

  deleteJob(jobId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/jobs/${jobId}`);
  }

  getApplicantsByJobId(jobId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/applications/job/${jobId}`);
  }
  updateApplicationStatus(applicationId: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/applications/${applicationId}`, { status });
  }

}
