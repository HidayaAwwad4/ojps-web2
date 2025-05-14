import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-job-intro',
  templateUrl: './job-intro.component.html',
  imports: [
    NgForOf
  ],
  standalone: true,
  styleUrls: ['./job-intro.component.css']
})
export class JobIntroComponent implements OnInit {
  images = [{
    src: 'assets/web-developer.png',
    alt: 'Web Developer',
    title: 'Build the Future of the Web',
    subtitle: 'Turn ideas into powerful websites.'
  }, {
    src: 'assets/fashion.png',
    alt: 'Fashion',
    title: 'Shape the World with Style',
    subtitle: 'Inspire confidence through design.'
  }, {
    src: 'assets/chef.png',
    alt: 'Chef & Cook',
    title: 'Cook with Passion',
    subtitle: 'Bring flavors to life with every dish.'
  }, {
    src: 'assets/waiter.png',
    alt: 'Waiters',
    title: 'Serve with Excellence',
    subtitle: 'Create memorable dining experiences.'
  }, {
    src: 'assets/ui-ux.png',
    alt: 'UI & UX Designer',
    title: 'Design that Feels Right',
    subtitle: 'Craft beautiful, human-centered experiences.'
  }, {
    src: 'assets/mobile-dev.png',
    alt: 'Mobile Developer',
    title: 'Power the World in Your Pocket',
    subtitle: 'Create intuitive and smart mobile apps.'
  }];

  currentIndex = 0;

  ngOnInit(): void {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 4000); // Change every 4 seconds
  }
}

