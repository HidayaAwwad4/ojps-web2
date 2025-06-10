import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  private getAuthHeaders() {
    let token = '';
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token') || '';
    }

    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
  }

  getApplicationDetails(applicationId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/applications/detail/${applicationId}`, this.getAuthHeaders());
  }

  getJobSeekerProfile(jobSeekerId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/job-seekers/${jobSeekerId}`, this.getAuthHeaders());
  }

  updateApplicationStatus(applicationId: number, status: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/applications/${applicationId}`, 
      { status }, 
      this.getAuthHeaders()
    );
  }

  downloadResume(jobSeekerId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/job-seekers/${jobSeekerId}/resume`, {
      ...this.getAuthHeaders(),
      responseType: 'blob'
    });
  }
}