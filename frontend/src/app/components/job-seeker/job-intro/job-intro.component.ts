import { Component, OnInit } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-job-intro',
  templateUrl: './job-intro.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./job-intro.component.css']
})
export class JobIntroComponent implements OnInit {
  images = [
    {
      src: 'assets/img_1.png',
      alt: 'Explore jobs',
      title: 'Find Your Dream Job',
      subtitle: 'Discover opportunities tailored just for you'
    },
    {
      src: 'assets/img.png',
      alt: 'Career path',
      title: 'Build Your Career',
      subtitle: 'We connect you with top employers'
    }
    // Add more images if you like
  ];

  currentIndex = 0;

  ngOnInit(): void {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 4000); // Change every 4 seconds
  }
}

