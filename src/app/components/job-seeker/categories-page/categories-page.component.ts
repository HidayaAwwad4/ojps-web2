import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgClass, NgForOf, NgStyle} from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  imports: [
    NgClass,
    NgForOf,
    RouterLink,
    NgStyle,
    NavbarComponent
  ],
  standalone: true,
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent {
  constructor(private router: Router) {}

  jobs = [
    { title: 'Fashion Stylist', description: 'Styling for magazines and events', image: 'assets/AR.jpg', salary: 26.32, saved: false },
    { title: 'Fashion Designer', description: 'Design new collections', image: 'assets/adham.jpg', salary: 22.95, saved: false },
    { title: 'Makeup Artist', description: 'Beauty & cosmetics expert', image: 'assets/AR.jpg', salary: 24.10, saved: false },
    { title: 'Runway Coach', description: 'Train models for the runway', image: 'assets/TECHNO.jpg', salary: 28.50, saved: false },
    { title: 'Textile Expert', description: 'Work with fabrics and trends', image: 'assets/AR.jpg', salary: 23.75, saved: false },
    { title: 'Fashion Blogger', description: 'Create fashion content online', image: 'assets/NEO.jpg', salary: 21.00, saved: false },
    { title: 'Shoe Designer', description: 'Design custom footwear', image: 'assets/TECHNO.jpg', salary: 27.40, saved: false },
    { title: 'Visual Merchandiser', description: 'Display expert for stores', image: 'assets/AR.jpg', salary: 25.60, saved: false },
    { title: 'Wardrobe Consultant', description: 'Personal styling for clients', image: 'assets/adham.jpg', salary: 22.20, saved: false },
    { title: 'Model Agent', description: 'Scout and manage talent', image: 'assets/NEO.jpg', salary: 29.90, saved: false }
  ];

  toggleSave(event: Event,job: any) {
    event.stopPropagation();
    job.saved = !job.saved;
  }

  goBack() {
    this.router.navigate(['/home-page']);
  }

  applyJob(job: any) {
    console.log('Applying for job:', job.title);
    this.router.navigate(['/application-review']).then(() => {
      console.log('Navigated to Application Review screen');
    }).catch(err => {
      console.error('Navigation error:', err);
    });
  }
}
