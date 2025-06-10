import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { NgForOf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-field-categories',
  standalone: true,
  templateUrl: './job-field-categories.component.html',
  styleUrls: ['./job-field-categories.component.css'],
  imports: [NgForOf]
})
export class JobFieldCategoriesComponent {

  categories = [
    { name: 'Marketing', image: '/assets/markiting.jpg' },
    { name: 'Technology', image: '/assets/tech.jpg' },
    { name: 'Design', image: '/assets/design.jpg' },
    { name: 'Sales', image: '/assets/sales.jpg' },
    { name: 'Cooking', image: '/assets/cooking.jpg' },
    { name: 'Other', image: '/assets/other.jpg' },
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onCategoryClick(categoryName: string) {
    console.log('Selected category:', categoryName);
    this.authService.updateCategory(categoryName).subscribe({
      next: (response) => {
        console.log('Update category response:', response);
        alert('Category saved successfully');
        this.router.navigate(['/home-page']);
      },
      error: (err) => {
        console.error('Error saving category:', err);
        alert('Failed to save category');
      }
    });
  }}



