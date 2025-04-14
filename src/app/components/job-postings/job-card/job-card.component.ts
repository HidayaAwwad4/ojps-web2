import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent {
  @Input() job: any;

}
