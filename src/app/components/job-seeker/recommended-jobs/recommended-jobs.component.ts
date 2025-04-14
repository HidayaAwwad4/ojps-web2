import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-recommended-jobs',
  templateUrl: './recommended-jobs.component.html',
  styleUrls: ['./recommended-jobs.component.css'],
  imports: [
    NgForOf,
    RouterLink],
  standalone: true
})
export class RecommendedJobsComponent {
  @Input() jobs: any[] = [];
  @Output() jobClicked = new EventEmitter<any>();
  @ViewChild('carousel', { static: true }) carousel!: ElementRef;

  onJobClick(job: any) {
    this.jobClicked.emit(job);
  }

  scrollLeft() {
    this.carousel.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.carousel.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }
}
