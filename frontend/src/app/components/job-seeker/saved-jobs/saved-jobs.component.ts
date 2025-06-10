import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location, NgClass, NgForOf } from '@angular/common';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  imports: [NgForOf, NgClass],
  styleUrls: ['./saved-jobs.component.css'],
  standalone: true
})
export class SavedJobsComponent implements OnInit {
  savedJobs: any[] = [];

  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.loadStaticSavedJobs();
  }

  loadStaticSavedJobs(): void {
    this.savedJobs = [
      {
        id: 1,
        title: 'Frontend Developer',
        description: 'Were hiring a Frontend Developer who can turn complex UI/UX designs into responsive, pixel-perfect ',
        salary: 1500.00,
        image: 'assets/adham.jpg',
        favorite_id: 101
      },
    ];
  }

  toggleSave(event: Event, job: any): void {
    event.stopPropagation();

    this.savedJobs = this.savedJobs.filter(j => j.id !== job.id);
  }

  goBack(): void {
    this.location.back();
  }

  applyJob(job: any): void {
    console.log('Applying for job:', job.title);
    this.router.navigate(['/application-review']);
  }
}
