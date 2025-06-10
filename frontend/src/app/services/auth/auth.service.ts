import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getAuthHeaders() {
    let token = '';
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token') || '';
    }

    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getRoles() {
    return this.http.get(`${this.apiUrl}/roles`);
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  getProfile() {
    return this.http.get(`${this.apiUrl}/user/profile`, this.getAuthHeaders())
      .pipe(
        tap((response: any) => {
          console.log('Profile response:', response);
        })
      );
  }

  updateProfile(data: any) {
    return this.http.post(`${this.apiUrl}/user/profile`, data, this.getAuthHeaders())
      .pipe(
        tap((response: any) => {
          console.log('Update profile response:', response);
        })
      );
  }

  uploadProfilePicture(file: File) {
    const formData = new FormData();
    formData.append('profile_picture', file);
    return this.http.post(`${this.apiUrl}/user/profile/picture`, formData, this.getAuthHeaders());
  }

  updatePassword(currentPassword: string, newPassword: string, confirmPassword: string) {
    return this.http.post(`${this.apiUrl}/user/update-password`, {
      current_password: currentPassword,
      password: newPassword,
      password_confirmation: confirmPassword
    }, this.getAuthHeaders());
  }

  uploadResume(file: File) {
    const formData = new FormData();
    formData.append('resume', file);
    return this.http.post(`${this.apiUrl}/user/resume`, formData, this.getAuthHeaders());
  }

  getJobSeekerProfile(id: number) {
    return this.http.get(`${this.apiUrl}/job-seekers/${id}`, this.getAuthHeaders());
  }

  downloadResume(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/job-seekers/${id}/resume`, {
      ...this.getAuthHeaders(),
      responseType: 'blob'
    }) as Observable<Blob>;
  }


  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {}, this.getAuthHeaders());
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  verifyForgotCode(email: string, verification_code: string) {
    return this.http.post(`${this.apiUrl}/verify-forgot-code`, { email, verification_code });
  }

  resetPassword(email: string, password: string, password_confirmation: string) {
    return this.http.post(`${this.apiUrl}/reset-password`, {
      email,
      password,
      password_confirmation
    });
  }

  verifyCode(user_id: number, verification_code: string) {
    return this.http.post(`${this.apiUrl}/verify-code`, { user_id, verification_code });
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }
}

