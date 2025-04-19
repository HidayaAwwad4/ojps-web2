import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  navItems = [
    { icon: 'assets/home-vector.png',     label: 'Home',         url: '#' },
    { icon: 'assets/bookmark-vector.png', label: 'Saved Jobs',   url: '#' },
    { icon: 'assets/folder-vector.png',   label: 'Applications', url: '#' },
    { icon: 'assets/account-vector.png',  label: 'Profile',      url: '#' },
  ];
}
