import { Component, Input } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-job-cards',
  standalone: true,
  templateUrl: './job-cards.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./job-cards.component.css']
})
export class JobCardsComponent {
  @Input() jobs: any[] = [];
}
