import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-application-review',
  templateUrl: './application-review.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./application-review.component.css']
})
export class ApplicationReviewComponent implements OnInit {
  public applicationForm: FormGroup;
  public cvUrl: string | null = null;
  public editingCV = false;
  public selectedFile: File | null = null;
  public applicationId = 1; // اجلب هذا الرقم ديناميكيًا حسب الحاجة

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.applicationForm = this.fb.group({
      coverLetter: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadApplication();
  }

  loadApplication() {
    this.http.get<any>(`http://127.0.0.1:8080/api/applications/${this.applicationId}`)
      .subscribe(app => {
        this.cvUrl = app?.cv_path
          ? `http://127.0.0.1:8080/storage/${app.cv_path}`
          : null;

        this.applicationForm.patchValue({
          coverLetter: app?.cover_letter || ''
        });
      }, error => {
        console.error('Error loading application:', error);
        this.cvUrl = null;
      });
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onEditCV() {
    this.editingCV = true;
  }

  uploadCV(): Promise<string | null> {
    if (!this.selectedFile) {
      return Promise.resolve(null);
    }

    const formData = new FormData();
    formData.append('cv', this.selectedFile);

    return this.http.post<{ cv_path: string }>('http://127.0.0.1:8080/api/upload-cv', formData)
      .toPromise()
      .then(res => res?.cv_path ?? null)
      .catch(err => {
        console.error('Upload failed:', err);
        return null;
      });
  }

  async onSubmit() {
    if (this.applicationForm.invalid) {
      alert('Please fill in the cover letter.');
      return;
    }

    let newCvPath = this.cvUrl;

    if (this.editingCV && this.selectedFile) {
      const uploadedPath = await this.uploadCV();
      if (!uploadedPath) {
        alert('Failed to upload CV.');
        return;
      }
      newCvPath = `http://127.0.0.1:8080/storage/${uploadedPath}`;
    }

    const payload = {
      cover_letter: this.applicationForm.value.coverLetter,
      cv_path: newCvPath,
      status: 'under_review'
    };

    this.http.put(`http://127.0.0.1:8080/api/applications/${this.applicationId}`, payload)
      .subscribe({
        next: () => {
          alert('Application submitted!');
          this.editingCV = false;
          this.loadApplication();
        },
        error: () => alert('Failed to update application.')
      });
  }
}
