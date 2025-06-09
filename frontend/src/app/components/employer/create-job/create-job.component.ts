import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { JobModalService } from '../../../services/jobs/job-modal.service';
import { JobService } from '../../../services/jobs/job.service';
import { NgIf, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-job',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule
  ],
  templateUrl: './create-job.component.html',
  styleUrl: './create-job.component.css'
})
export class CreateJobComponent implements OnInit {
  @Output() jobCreated = new EventEmitter<any>();
  @ViewChild('logoInput') logoInput!: ElementRef;

  showModal = false;
  selectedLogo: File | null = null;
  selectedLogoUrl: string | null = null;

  jobOptions: any = {
    experienceOptions: [],
    employmentOptions: [],
    categoryOptions: []
  };

  jobDetails: any = {
    title: '',
    description: '',
    location: '',
    languages: '',
    schedule: '',
    experience: '',
    employment: '',
    category: '',
    salary: null,
    documents: null,
    company_logo: null,
    isOpened: 1,
    employer_id: null
  };

  constructor(
    private jobModalService: JobModalService,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.jobModalService.openModal$.subscribe(() => {
      this.showModal = true;
    });

    this.jobService.getJobFormOptions().subscribe((res: any) => {
      this.jobOptions = res;
    });

    this.jobService.getEmployerByUser().subscribe({
      next: (employerData) => {
        if (employerData && employerData.id) {
          this.jobDetails.employer_id = employerData.id;
        } else {
          console.warn('Employer data or ID not found');
        }
      },
      error: (error) => {
        console.error('Failed to get employer data', error);
      }
    });
  }

  submitJob(): void {
    const formData = new FormData();
    for (const key in this.jobDetails) {
      if (this.jobDetails[key] !== null && this.jobDetails[key] !== undefined) {
        if (key === 'documents' || key === 'company_logo') continue;
        formData.append(key, this.jobDetails[key]);
      }
    }
    if (this.selectedLogo) {
      formData.append('company_logo', this.selectedLogo);
    }
    if (this.jobDetails.documents) {
      formData.append('documents', this.jobDetails.documents);
    }
    this.jobService.createJob(formData).subscribe({
      next: (response) => {
        console.log('Job created successfully:', response);
        this.jobCreated.emit(response);
        this.showModal = false;
        this.resetForm();
      },
      error: (error) => {
        console.error('Error creating job:', error);
        alert('Error: ' + JSON.stringify(error.error));
      }
    });
  }

  closeModal(): void {
    const hasData =
      this.jobDetails.title?.trim() ||
      this.jobDetails.description?.trim() ||
      this.jobDetails.location?.trim() ||
      this.jobDetails.languages?.trim() ||
      this.jobDetails.schedule?.trim() ||
      this.jobDetails.salary ||
      this.jobDetails.experience ||
      this.jobDetails.employment ||
      this.jobDetails.category ||
      this.selectedLogo;

    if (hasData) {
      const confirmClose = confirm('Are you sure you want to close? Unsaved data will be lost.');
      if (!confirmClose) return;
    }

    this.showModal = false;
  }

  onLogoSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedLogo = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedLogoUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  triggerLogoUpload(): void {
    this.logoInput.nativeElement.click();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.jobDetails.documents = file;
  }

  isFormValid(): boolean {
    const job = this.jobDetails;
    return job.title?.trim() &&
      job.description?.trim() &&
      job.location?.trim() &&
      job.languages?.trim() &&
      job.schedule?.trim() &&
      job.experience &&
      job.employment &&
      !isNaN(job.salary) &&
      job.category;
  }

  protected readonly isNaN = isNaN;

  resetForm(): void {
    this.jobDetails = {
      title: '',
      description: '',
      location: '',
      languages: '',
      schedule: '',
      experience: '',
      employment: '',
      category: '',
      salary: null,
      documents: null,
      company_logo: null,
      isOpened: 1,
      employer_id: this.jobDetails.employer_id
    };
    this.selectedLogo = null;
    this.selectedLogoUrl = null;
  }
}
