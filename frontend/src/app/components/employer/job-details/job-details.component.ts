import { Component, OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../navbar/navbar.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    FormsModule,
    RouterLink,
    NavbarComponent,
  ],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent implements OnInit {
  role: 'employer' | 'job-seeker' = 'employer';
  isEditMode = false;
  isSaved = false;
  jobDetails: any = {};

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['role'] === 'employer' || params['role'] === 'job-seeker') {
        this.role = params['role'];
      }
    });

    const jobId = this.route.snapshot.paramMap.get('id');
    if (jobId) {
      this.http.get(`http://localhost:8000/api/jobs/${jobId}`).subscribe({
        next: (response: any) => {
          this.jobDetails = response;
        },
        error: (err) => {
          console.error('Failed to fetch job', err);
        }
      });
    }
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  saveChanges() {
    this.isEditMode = false;
  }

  toggleSave() {
    this.isSaved = !this.isSaved;
  }

  goBack() {
    window.history.back();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.jobDetails.document = file;
    }
  }

  removeDocument() {
    this.jobDetails.document = '';
  }
}
