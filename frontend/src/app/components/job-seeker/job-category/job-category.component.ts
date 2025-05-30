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
    { title: 'Marketing', icon: 'fas fa-bullhorn' },
    { title: 'Technology', icon: 'fas fa-microchip' },
    { title: 'Sales', icon: 'fas fa-chart-line' },
    { title: 'Cooking', icon: 'fas fa-utensils' },
    { title: 'Design', icon: 'fas fa-paint-brush' }
  ];


  onCategoryClick(jobTitle: string) {
      this.router.navigate(['/categories-page']).then(r => {
        console.log('تم الانتقال لصفحة الفاشن بنجاح');
      });
    }
}
