import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {JobModalService} from '../../services/job-modal.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() role: 'admin' | 'jobseeker' | 'employer' = 'jobseeker';
  constructor(private jobModalService: JobModalService) {}

  openJobModal() {
    this.jobModalService.openCreateJobModal();
  }
}
