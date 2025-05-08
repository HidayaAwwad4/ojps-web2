import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {FooterComponent} from './components/footer/footer.component'
import {NgIf} from '@angular/common';
import {NavbarComponent} from './components/navbar/navbar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NgIf, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public router: Router) {
  }

  isAuthPage(): boolean {
    const hiddenFooterRoutes = ['/', '/signup','/signup-employer',
      '/forgot-password','/verify-code','/field','/login','/type',
      '/reset-password','/dashboard-admin'];
    return hiddenFooterRoutes.includes(this.router.url);
  }
}

