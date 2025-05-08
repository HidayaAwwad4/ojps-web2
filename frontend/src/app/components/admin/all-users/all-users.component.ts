import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NgForOf, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
  standalone: true,
  imports: [NgForOf, NgStyle, FormsModule]
})
export class AllUsersComponent {
  constructor(private location: Location) {}

  searchTerm: string = '';

  users = [
    { name: 'Mohammad Husain', email: 'Mohammad@gmail.com', type: 'Job Seeker', location: 'Nablus' },
    { name: 'Hidaya Awwad', email: 'Hidaya@gmail.com', type: 'employers', location: 'Nablus' },
    { name: 'Islam Sadaldeen', email: 'Islam@gmail.com', type: 'Job Seeker', location: 'Nablus' },
    { name: 'Razan abudaia', email: 'Razan@gmail.com', type: 'employers', location: 'Nablus' },
    { name: 'Tasneem jber', email: 'Tasneem@gmail.com', type: 'Job Seeker', location: 'Nablus' },
    { name: 'Haneen Akobeh', email: 'Haneen@gmail.com', type: 'employers', location: 'Nablus' },
  ];

  filteredUsers() {
    return this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectedUser: any = null;
  openConfirmModal(user: any) {
    this.selectedUser = user;
    const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
    modal.show();
  }

  confirmDelete() {
    if (this.selectedUser) {
      this.users = this.users.filter(user => user !== this.selectedUser);
    }
    this.selectedUser = null;
  }

  goBack() {
    this.location.back();
  }
}
