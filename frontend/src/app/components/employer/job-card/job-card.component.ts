import { Component, Input, Output, EventEmitter, inject, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JobService } from '../../../services/jobs/job.service';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent {
  @Input() job: any;
  @Output() statusChange = new EventEmitter<{ job: any; isOpened: boolean }>();

  private jobService = inject(JobService);

  dropdownOpen = false;

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    this.closeDropdown();
  }

  onDetailsClick(event: Event) {
    event.stopPropagation();
    this.closeDropdown();
  }

  onEditClick(event: Event) {
    event.stopPropagation();
    this.closeDropdown();
  }

  onDeleteClick(event: Event) {
    event.stopPropagation();
    this.closeDropdown();

    if (confirm('Are you sure you want to delete this job?')) {
      this.jobService.deleteJob(this.job.id).subscribe({
        next: () => {
          this.statusChange.emit({ job: this.job, isOpened: false });
        },
        error: (err) => {
          console.error('Failed to delete job:', err);
          alert('Failed to delete job.');
        }
      });
    }
  }


  onApplicantsClick(event: Event) {
    event.stopPropagation();
    this.closeDropdown();
  }

  onCloseClick(event: Event) {
    event.stopPropagation();
    this.closeDropdown();
    this.updateJobStatus(false);
  }

  onOpenClick(event: Event) {
    event.stopPropagation();
    this.closeDropdown();
    this.updateJobStatus(true);
  }

  updateJobStatus(isOpened: boolean) {
    const updatedJob = {
      ...this.job,
      isOpened: isOpened,
    };

    this.jobService.updateJobStatus(this.job.id, isOpened).subscribe({
      next: (res) => {
        this.statusChange.emit({ job: updatedJob, isOpened });
        this.job.isOpened = isOpened;
      },
      error: (err) => {
        console.error('Failed to update job status:', err);
        alert('Failed to update job status.');
      }
    });
  }


}
