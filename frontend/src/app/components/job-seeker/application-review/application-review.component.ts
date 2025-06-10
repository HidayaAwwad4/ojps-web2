import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JobService } from '../../../services/jobs/job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-application-review',
  templateUrl: './application-review.component.html',
  styleUrls: ['./application-review.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ApplicationReviewComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  cvFile: File | null = null;
  cvFileName: string | null = null;
  coverLetter: string = '';
  formValid: boolean = false;
  jobId!: number;

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location // لاستعمال زر الرجوع
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['jobId'];
      if (!id) {
        alert('No job selected for application.');
        this.router.navigate(['/home-page']);
        return;
      }
      this.jobId = +id;
      this.loadExistingCV();
    });
  }

  loadExistingCV() {
    this.jobService.getUserCV().subscribe({
      next: (res) => {
        if (res.cvFileName) {
          this.cvFileName = res.cvFileName;
        }
        this.validateForm();
      },
      error: (err) => {
        console.error('Error fetching CV:', err);
      },
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.cvFile = file;
      this.cvFileName = file.name;
    } else {
      alert('Please upload a valid PDF file.');
      this.cvFile = null;
      this.cvFileName = null;
      this.fileInput.nativeElement.value = '';
    }
    this.validateForm();
  }

  onEditCV() {
    this.fileInput.nativeElement.click();
  }

  validateForm() {
    this.formValid = !!this.cvFileName && this.coverLetter.trim().length > 0;
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    if (!this.formValid) return;

    const formData = new FormData();
    formData.append('cover_letter', this.coverLetter);
    formData.append('job_id', this.jobId.toString());

    if (this.cvFile) {
      formData.append('cv_file', this.cvFile);
    }

    this.jobService.submitApplication(formData).subscribe({
      next: () => {
        this.cvFile = null;
        this.cvFileName = null;
        this.coverLetter = '';
        this.fileInput.nativeElement.value = '';
        this.validateForm();

        if (confirm('Application submitted successfully. Go to home page?')) {
          this.router.navigate(['/home-page']);
        }
      },
      error: (err) => {
        console.error('Error submitting application:', err);
        alert('An error occurred while submitting your application');
      }
    });
  }
}
