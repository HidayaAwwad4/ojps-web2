import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

interface Job {
  title: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  closed: boolean;
}

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  standalone: true,
  imports: [FormsModule, NgForOf],
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent {
  @Input() job: any;

}
