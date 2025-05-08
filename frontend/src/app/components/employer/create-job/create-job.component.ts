import {Component, OnInit} from '@angular/core';
import {JobModalService} from '../../../services/job-modal.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-create-job',
  imports: [
    NgIf
  ],
  templateUrl: './create-job.component.html',
  standalone: true,
  styleUrl: './create-job.component.css'
})

export class CreateJobComponent implements OnInit {
  showModal = false;

  constructor(private jobModalService: JobModalService) {
  }

  ngOnInit(): void {
    this.jobModalService.openModal$.subscribe(() => {
      this.showModal = true;
    });
  }

  closeModal() {
    this.showModal = false;
  }
}
