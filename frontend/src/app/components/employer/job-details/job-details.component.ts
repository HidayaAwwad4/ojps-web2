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
      this.loadJobDetails(jobId);
    }
    this.jobService.getJobFormOptions().subscribe((res: any) => {
      this.jobOptions = res;
    });
  }

  loadJobDetails(jobId: number) {
    this.jobService.getJobById(jobId).subscribe({
      next: (response: any) => {
        this.jobDetails = response;
        this.jobDetails.preview_logo = response.company_logo || null;
      },
      error: (err) => {
        console.error('Failed to fetch job', err);
      }
    });
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  saveChanges() {
    const jobId = this.jobDetails.id;

    const formData = new FormData();
    formData.append('title', this.jobDetails.title);
    formData.append('location', this.jobDetails.location);
    formData.append('description', this.jobDetails.description);
    formData.append('experience', this.jobDetails.experience);
    formData.append('languages', this.jobDetails.languages);
    formData.append('employment', this.jobDetails.employment);
    formData.append('schedule', this.jobDetails.schedule);
    formData.append('category', this.jobDetails.category);
    formData.append('salary', this.jobDetails.salary);

    if (this.jobDetails.company_logo instanceof File) {
      formData.append('company_logo', this.jobDetails.company_logo);
    }
    if (this.jobDetails.documents instanceof File) {
      formData.append('documents', this.jobDetails.documents);
    }

    this.jobService.updateJob(jobId, formData).subscribe({
      next: (res) => {
        console.log('update success', res);
        this.jobDetails = res;
        this.isEditMode = false;
      },
      error: (err) => {
        console.error('Error updating job', err);
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

    const fileUrl = typeof this.jobDetails.documents === 'string' ? this.jobDetails.documents : null;
    if (!fileUrl) return;

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
