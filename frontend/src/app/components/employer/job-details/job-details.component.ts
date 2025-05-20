import { Component, OnInit } from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import {JobService} from '../../../services/jobs/job.service';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    FormsModule,
    RouterLink,
    NavbarComponent,
    NgForOf,
  ],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent implements OnInit {
  role: 'employer' | 'job-seeker' = 'employer';
  isEditMode = false;
  isSaved = false;
  jobDetails: any = {};

  jobOptions: any = {
    experienceOptions: [],
    employmentOptions: [],
    categoryOptions: []
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private jobService: JobService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['role'] === 'employer' || params['role'] === 'job-seeker') {
        this.role = params['role'];
      }
    });

    const jobId =  Number(this.route.snapshot.paramMap.get('id'));
    if (jobId) {
      this.jobService.getJobById(jobId).subscribe({
        next: (response: any) => {
          this.jobDetails = response;
        },
        error: (err) => {
          console.error('Failed to fetch job', err);
        }
      });
    }
    this.jobService.getJobFormOptions().subscribe((res: any) => {
      this.jobOptions = res;
    });
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  saveChanges() {
    if (!this.jobDetails.id) return;

    const formData = new FormData();

    for (const key in this.jobDetails) {
      if (this.jobDetails.hasOwnProperty(key)) {
        if (key === 'company_logo' || key === 'documents') {
          continue;
        }
        formData.append(key, this.jobDetails[key]);
      }
    }

    if (this.jobDetails.company_logo instanceof File) {
      formData.append('company_logo', this.jobDetails.company_logo);
    }

    if (this.jobDetails.documents instanceof File) {
      formData.append('documents', this.jobDetails.documents);
    }

    this.jobService.updateJob(this.jobDetails.id, formData).subscribe({
      next: (response) => {
        this.jobDetails = response;
        this.isEditMode = false;
        this.isSaved = true;
      },
      error: (error) => {
        console.error('Failed to update job', error);
        alert('Failed to save changes!');
      }
    });
  }

  toggleSave() {
    this.isSaved = !this.isSaved;
  }

  goBack() {
    window.history.back();
  }

  onLogoChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.jobDetails.company_logo = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.jobDetails.preview_logo = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }


  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.jobDetails.documents = file;
    }
  }
  downloadDocument() {
    if (!this.jobDetails.documents) return;

    const fileUrl = this.jobDetails.documents;
    const link = document.createElement('a');
    link.href = fileUrl;
    const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


  removeDocument() {
    this.jobDetails.documents = null;
  }
}
