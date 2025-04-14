import { Component } from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './footer.component.html',
  standalone: true,
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  footerSections = [
    {
      title:"The Company",
      links: ['Contact Us', 'About Us', 'Available', 'Frequently Asked Questions']
    },
    {
      title: 'Services',
      links: ['Post a Job', 'Manage Applications', 'View Candidates', 'Analytics & Reports']
    },
    {
      title: 'Benefits',
      links: ['Easy Job Posting', 'Access to Qualified Candidates', 'User Ratings & Feedback']
    },
    {
      title: 'Additional Links',
      links: ['Privacy Policy', 'Terms of Service', 'Technical Support']
    }
  ];
  socialMedia = [
    {
      name:"facebook",
      icon: "bi-facebook",
      url: "#"
    },
    {
      name: "Twitter",
      icon: "bi-twitter-x",
      url: "#"
    },
    {
      name: "LinkedIn",
      icon: "bi-linkedin",
      url: "#"
    },
    {
      name: "YouTube",
      icon: "bi-youtube",
      url: "#"
    },
  ]
}
