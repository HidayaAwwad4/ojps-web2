import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getRoles() {
    return this.http.get(`${this.apiUrl}/roles`);
  }


  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  getProfile(token: string) {
    return this.http.get(`${this.apiUrl}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  logout(token: string) {
    return this.http.post(`${this.apiUrl}/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
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
}
