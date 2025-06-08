import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {FooterComponent} from './components/footer/footer.component'
import {AsyncPipe,NgIf} from '@angular/common';
import {NotificationDrawerComponent} from './components/Notification/notification-drawer/notification-drawer.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import { NotificationService } from './services/notifications/notification.service';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NgIf, AsyncPipe, NotificationDrawerComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    title(title: any) {
        throw new Error('Method not implemented.');
    }

  drawerVisible!: Observable<boolean>;
  constructor(public router: Router , private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.drawerVisible = this.notificationService.drawerVisible$;
  }


  isAuthPage(): boolean {
    const hiddenFooterRoutes = ['/', '/sign-up',
      '/forgot-password','/verify-code','/field','/login','/type',
      '/reset-password','/dashboard-admin','/job-details'];
    return hiddenFooterRoutes.includes(this.router.url);
  }

  toggleDrawer() {
    this.notificationService.toggleDrawer();

  }

  getRole(): 'admin' | 'seeker' | 'employer' | 'guest' {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const role = localStorage.getItem('role');
      if (role === 'admin' || role === 'seeker' || role === 'employer' || role === 'guest') {
        return role;
      }
    }
    return 'employer';
  }

    getUserType(): 'seeker' | 'employer' | null {
    const role = this.getRole();
    return role === 'seeker' || role === 'employer' ? role : null;
  }
}
