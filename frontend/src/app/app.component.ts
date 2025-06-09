import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { NotificationDrawerComponent } from './components/Notification/notification-drawer/notification-drawer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotificationService } from './services/notifications/notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    NgIf,
    AsyncPipe,
    NotificationDrawerComponent,
    NavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] //  fixed spelling
})
export class AppComponent implements OnInit {
  drawerVisible!: Observable<boolean>;

  constructor(public router: Router, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.drawerVisible = this.notificationService.drawerVisible$;
  }

  isAuthPage(): boolean {
    const hiddenFooterRoutes = [
      '/',
      '/sign-up',
      '/forgot-password',
      '/verify-code',
      '/field',
      '/login',
      '/type',
      '/reset-password',
      '/dashboard-admin',
      '/job-details'
    ];
    return hiddenFooterRoutes.includes(this.router.url);
  }

  toggleDrawer() {
    this.notificationService.toggleDrawer();
  }

  getRole(): 'admin' | 'job-seeker' | 'employer' | 'guest' {
    const role = localStorage.getItem('role');
    if (role === 'admin' || role === 'job-seeker' || role === 'employer') {
      return role as 'admin' | 'job-seeker' | 'employer';
    }
    return 'guest';
  }


  getUserType(): 'job-seeker' | 'employer' | null {
    const role = this.getRole();
    return role === 'job-seeker' || role === 'employer' ? role : null;
  }
}