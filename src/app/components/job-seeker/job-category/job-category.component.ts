import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-category',
  standalone: true,
  templateUrl: './job-category.component.html',
  imports: [NgForOf],
  styleUrls: ['./job-category.component.css']
})
export class JobCategoriesComponent {
  constructor(private router: Router) {}

  jobs = [
    { title: 'Web Developer', icon: 'fa-solid fa-laptop-code' },
    { title: 'Fashion', icon: 'fa-solid fa-person-dress' },
    { title: 'Chef & Cook', icon: 'fas fa-utensils' },
    { title: 'Waiters', icon: 'fas fa-concierge-bell' },
    { title: 'UI & UX Designer', icon: 'fas fa-paint-brush' },
    { title: 'Mobile Developer', icon: 'fas fa-mobile-alt' }
  ];

  onCategoryClick(jobTitle: string) {
      this.router.navigate(['/categories-page']).then(r => {
        console.log('تم الانتقال لصفحة الفاشن بنجاح');
      });
    }
}
