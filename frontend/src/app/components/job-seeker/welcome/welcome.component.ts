import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  standalone: true,
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/home/guest']).then(() => {
      console.log('Navigation successful!');
    }).catch((error) => {
      console.error('Navigation error:', error);
    });
  }
}
