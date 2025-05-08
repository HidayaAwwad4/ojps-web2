import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-stat-cards',
  imports: [
    NgForOf
  ],
  templateUrl: './stat-cards.component.html',
  styleUrl: './stat-cards.component.css'
})
export class StatCardsComponent {
  stats = [
    { label: 'Registered Users', icon: 'bi bi-people-fill', value: 1200 },
    { label: 'Number of Job Seekers', icon: 'bi bi-person-badge', value: 800 },
    { label: 'Number of Employers', icon: 'bi bi-building', value: 200 },
    { label: 'Jobs Posted', icon: 'bi bi-briefcase-fill', value: 450 },
    { label: 'Requests Accepted', icon: 'bi bi-check-circle-fill', value: 300 },
    { label: 'Requests Rejected', icon: 'bi bi-x-circle-fill', value: 150 }
  ];
}
