import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getUserRole(): 'seeker' | 'employer' | null {
    const role = localStorage.getItem('role'); // or decode from JWT
    if (role === 'seeker' || role === 'employer') return role;
    return null;
  }

}
