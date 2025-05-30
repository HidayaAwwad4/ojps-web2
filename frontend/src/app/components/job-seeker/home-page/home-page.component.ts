import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../../services/jobs/job.service';
import { JobCardsComponent } from '../job-cards/job-cards.component';
import { RecommendedJobsComponent } from '../recommended-jobs/recommended-jobs.component';
import { JobCategoriesComponent } from '../job-category/job-category.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { JobIntroComponent } from '../job-intro/job-intro.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './home-page.component.html',
  standalone: true,
  imports: [
    FormsModule,
    RecommendedJobsComponent,
    JobCategoriesComponent,
    NavbarComponent,
    JobIntroComponent,
    JobCardsComponent // ✅ أضفتيه عشان تستخدميه
  ],
  styleUrls: ['./home-page.component.css']
})
export class HomepageComponent implements OnInit {
  searchText: string = '';
  allJobs: any[] = [];
  recommendedJobs: any[] = [];

  constructor(private router: Router, private jobService: JobService) {}

  ngOnInit() {
    this.fetchAllJobs();
  }

  fetchAllJobs() {
    this.jobService.getJobsByEmployer(1).subscribe((jobs) => {
      this.allJobs = jobs;
      this.recommendedJobs = jobs.slice(0, 3); // أو أي فلترة للتوصيات
    });
  }

  onSearchChange() {
    if (this.searchText.trim() === '') {
      this.fetchAllJobs();
      return;
    }

    this.allJobs = this.allJobs.filter(job =>
      job.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

}
