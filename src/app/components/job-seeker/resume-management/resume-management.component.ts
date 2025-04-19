import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-resume-management',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './resume-management.component.html',
  styleUrls: ['./resume-management.component.css']
})
export class ResumeManagementComponent {
  experiences = [
    { company: 'ABC Corp', position: 'Software Engineer', from: '2019', to: '2023' },
    { company: 'XYZ Inc', position: 'Web Developer', from: '2016', to: '2019' }
  ];

  education = [
    { degree: 'B.Sc.', field: 'Computer Science', institution: 'MIT', year: '2015' },
    { degree: 'High School', field: 'Science', institution: 'Central High School', year: '2011' }
  ];

  strengths = ['Problem Solving', 'Teamwork'];
  weaknesses = ['Perfectionism', 'Public Speaking'];

  addExperience() {
    this.experiences.push({ company: '', position: '', from: '', to: '' });
  }

  deleteExperience(index: number) {
    this.experiences.splice(index, 1);
  }

  addEducation() {
    this.education.push({ degree: '', field: '', institution: '', year: '' });
  }

  deleteEducation(index: number) {
    this.education.splice(index, 1);
  }

  addStrength() {
    this.strengths.push('');
  }

  deleteStrength(index: number) {
    this.strengths.splice(index, 1);
  }

  addWeakness() {
    this.weaknesses.push('');
  }

  deleteWeakness(index: number) {
    this.weaknesses.splice(index, 1);
  }
  showResumeModal = false;
uploadedResumeFile: File | null = null;

uploadResume() {
  this.showResumeModal = true;
}

handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    this.uploadedResumeFile = target.files[0];
  }
}

saveResume() {
  if (this.uploadedResumeFile) {
    console.log('Resume uploaded:', this.uploadedResumeFile.name);
  }
  this.showResumeModal = false;
  this.uploadedResumeFile = null;
}

cancelResumeUpload() {
  this.showResumeModal = false;
  this.uploadedResumeFile = null;
}

}