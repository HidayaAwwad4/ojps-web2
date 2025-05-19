import { Component, OnInit } from '@angular/core';
import { JobModalService } from '../../../services/job-modal.service';
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
  showModal = false;

  jobOptions: any = {
    experiences: [],
    employmentTypes: [],
    categories: []
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
    document: null,
    isOpened: 1,
    employer_id: 1
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
  }

  closeModal() {
    this.showModal = false;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.jobDetails.document = file;
  }

  submitJob() {
    console.log('Job Data:', this.jobDetails);
    this.jobService.createJob(this.jobDetails).subscribe({
      next: (response) => {
        console.log('Job created successfully:', response);
        this.closeModal();
      },
      error: (error) => {
        console.error('Error creating job:', error);
      }
    });
  }

  isFormValid(): boolean {
    const job = this.jobDetails;
    return job.title?.trim() &&
      job.description?.trim() &&
      job.location?.trim() &&
      job.languages?.trim() &&
      job.schedule?.trim() &&
      job.salary?.trim() &&
      job.experience &&
      job.employment &&
      !isNaN(job.salary) &&
      job.category;
  }

  protected readonly isNaN = isNaN;
}
