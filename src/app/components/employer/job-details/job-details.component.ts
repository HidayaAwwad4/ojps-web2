import {Component, OnInit} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-job-details',
  imports: [
    NgClass,
    NgIf,
    FormsModule,
    RouterLink,
    NavbarComponent
  ],
  templateUrl: './job-details.component.html',
  standalone: true,
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent implements OnInit {
  role: 'employer' | 'job-seeker' = 'employer';
  isEditMode = false;
  isSaved = false;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['role'] === 'employer' || params['role'] === 'job-seeker') {
        this.role = params['role'];
      }
    });
  }
  jobDetails = {
    title: 'Front End Web Developer',
    companyName: 'ADHAM',
    location: 'Nablus, Palestine',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
      ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
      ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
      'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ' +
      'reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla ' +
      'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa ' +
      'qui officia deserunt mollit anim id est laborum.',
    experienceRequired: 'Required',
    languages: 'English - Advanced',
    employmentType: 'Full-time',
    schedule: 'Wednesday to Saturday',
    salary: '$800 - $1000 monthly',
    document: 'job_seeker_1471014.pdf'
  };

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
