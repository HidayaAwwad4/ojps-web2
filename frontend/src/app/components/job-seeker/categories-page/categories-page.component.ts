import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { JobService } from '../../../services/jobs/job.service';
import {NgClass, NgForOf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css'],
  imports: [
    NgClass,
    NgStyle,
    RouterLink,
    NgForOf
  ]
})
export class CategoriesPageComponent implements OnInit {
  jobs: any[] = [];

  constructor(private router: Router, private jobService: JobService) {}

  ngOnInit() {
    // هنا تجيب كل الوظائف مثلا أو حسب فئة محددة
    this.jobService.getAllJobs().subscribe((data) => {
      this.jobs = data;
    });
  }

  toggleSave(event: Event, job: any) {
    event.stopPropagation();
    job.saved = !job.saved;
  }

  goBack() {
    this.router.navigate(['/home-page']);
  }

  applyJob(job: any) {
    console.log('Applying for job:', job.title);
    this.router.navigate(['/application-review']);
  }
}
