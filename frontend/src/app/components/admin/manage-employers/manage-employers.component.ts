import { Component } from '@angular/core';
import { NgClass, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import {NavbarComponent} from "../../navbar/navbar.component";

declare var bootstrap: any;

@Component({
  selector: 'app-manage-employers',
  templateUrl: './manage-employers.component.html',
  styleUrls: ['./manage-employers.component.css'],
  standalone: true,
    imports: [NgForOf, FormsModule, NgClass, NavbarComponent],
})
export class ManageEmployersComponent {
  constructor(private location: Location) {}

  searchTerm: string = '';

  employers = [
    { name: 'Mohammad Husain', email: 'Mohammad@gmail.com', status: 'pending' },
    { name: 'Hidaya Awwad', email: 'Hidaya@gmail.com', status: 'pending' },
    { name: 'Islam Sadaldeen', email: 'Islam@gmail.com', status: 'pending' },
    { name: 'Razan abudaia', email: 'Razan@gmail.com', status: 'pending' },
    { name: 'Tasneem jber', email: 'Tasneem@gmail.com', status: 'pending' },
    { name: 'Haneen Akobeh', email: 'Haneen@gmail.com', status: 'pending' },
  ];

  selectedEmployer: any = null;
  actionType: 'approve' | 'remove' = 'remove';

  filteredEmployers() {
    return this.employers.filter(employer =>
      employer.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openConfirmModal(employer: any, action: 'approve' | 'remove') {
    this.selectedEmployer = employer;
    this.actionType = action;
    const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
    modal.show();
  }

  confirmAction() {
    if (!this.selectedEmployer) return;

    if (this.actionType === 'remove') {
      this.employers = this.employers.filter(emp => emp !== this.selectedEmployer);
    } else if (this.actionType === 'approve') {
      const index = this.employers.findIndex(emp => emp === this.selectedEmployer);
      if (index !== -1) {
        this.employers[index] = {
          ...this.selectedEmployer,
          status: 'approved',
        };
      }
    }
    this.selectedEmployer = null;
  }

  goBack() {
    this.location.back();
  }
}
