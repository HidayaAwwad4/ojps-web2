import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';
import { JobModalService } from '../../../services/job-modal.service';
import {JobCardComponent} from "../job-card/job-card.component";
import {CreateJobComponent} from '../create-job/create-job.component';
import console from 'node:console';
import { NavbarComponent } from '../../navbar/navbar.component';
@Component({
  selector: 'app-employer-home',
  standalone:true,
  imports: [JobCardComponent, NgForOf, RouterLink, CreateJobComponent,NavbarComponent],
  templateUrl: './employer-home.component.html',
  styleUrl: './employer-home.component.css'
})
export class EmployerHomeComponent {
  constructor(private jobModalService: JobModalService) {}

  openJobModal() {
    this.jobModalService.openCreateJobModal();
  }
  jobs = [
    {
      image: 'assets/adham.jpg',
      title: 'Full-Stack Developer',
      description: 'Responsible for developing both front-end and back-end systems.',
      salary: '$800 - $1000 Salary/Month',
      status: 'open'
    },
    {
      image: 'assets/adham.jpg',
      title: 'UI/UX Designer',
      description: 'Focus on crafting intuitive and visually appealing user interfaces.',
      salary: '$700 - $900 Salary/Month',
      status: 'open'
    },
    {
      image: 'assets/adham.jpg',
      title: 'Mobile App Developer',
      description: 'Build and maintain cross-platform mobile applications.',
      salary: '$750 - $950 Salary/Month',
      status: 'open'
    },
    {
      image: 'assets/adham.jpg',
      title: 'Data Analyst',
      description: 'Analyze data trends and create reports.',
      salary: '$850 - $1050 Salary/Month',
      status: 'open'
    }
  ];

}
