import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent {
  @Input() job: any;
  @Output() closeJob = new EventEmitter<void>();

  onCloseClick(event: Event) {
    event.stopPropagation();
    this.closeJob.emit();
  }

  onDeleteClick(event: Event) {
    event.stopPropagation();
  }

}
