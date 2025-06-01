import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chose-user-type',
  templateUrl: './chose-user-type.component.html',
  styleUrls: ['./chose-user-type.component.css']
})
export class ChoseUserTypeComponent {
  selectedRole: string | null = null;

  constructor(private router: Router) {}

  selectRole(role: string) {
    this.selectedRole = role;
  }

  startNow() {
    if (this.selectedRole) {
      this.router.navigate(['/sign-up'], { queryParams: { role: this.selectedRole } });

    } else {
      alert('Please select a role first');
    }
  }
}
