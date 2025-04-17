import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {RecommendedJobsComponent} from '../recommended-jobs/recommended-jobs.component';
import {JobCategoriesComponent} from '../job-category/job-category.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './home-page.component.html',
  imports: [
    FormsModule,
    RecommendedJobsComponent,
    JobCategoriesComponent
  ],
  styleUrls: ['./home-page.component.css']
})
export class HomepageComponent {
  searchText: string = '';

  constructor(private router: Router) {}

  navigateToCategory(category: string) {
    this.router.navigate(['/categories-page', category]);
  }


  onSearchChange() {}

  recommendedJobs = [
    {
      title: 'Full-Stack Developer',
      description: 'Responsible for developing both front-end and back-end systems.',
      logo: 'assets/adham.jpg',
      rate: 26.32
    },
    {
      title: 'Front-End Developer',
      description: 'Building engaging UIs using HTML, CSS, and JavaScript.',
      logo: 'assets/NEO.jpg',
      rate: 11.32
    },
    {
      title: 'Back-End Developer',
      description: 'Focuses on server-side logic and integration of services.',
      logo: 'assets/Tecnhnolgy.jpg',
      rate: 20.32
    },
    {
      title: 'Software Tester',
      description: 'Tests software before release, ensuring high-quality.',
      logo: 'assets/TECHNO.jpg',
      rate: 18.32
    },
    {
      title: 'UI/UX Designer',
      description: 'Designs intuitive and visually appealing interfaces.',
      logo: 'assets/AR.jpg',
      rate: 15.32
    },
    {
      title: 'DevOps Engineer',
      description: 'Responsible for automating and optimizing the development and deployment pipelines.',
      logo: 'assets/NEO.jpg',
      rate: 23.00
    },
    {
      title: 'Data Scientist',
      description: 'Analyzes large datasets to extract meaningful insights for decision-making.',
      logo: 'assets/adham.jpg',
      rate: 28.50
    }
  ];

  handleJobClick(job: any) {
    console.log('Clicked job:', job);
  }
}
