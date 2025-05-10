import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NgForOf, NgStyle, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {EditUserComponent} from '../edit-user/edit-user.component';
import {AddUserComponent} from '../add-user/add-user.component';
import {NavbarComponent} from '../../navbar/navbar.component';
declare var bootstrap: any;

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
  standalone: true,
  imports: [NgForOf, NgStyle, FormsModule, NgIf, EditUserComponent, AddUserComponent, NavbarComponent]
})
export class AllUsersComponent {
  constructor(private location: Location) {}

  searchTerm: string = '';
  editMode = false;
  userBeingEdited: any = null;

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

  editUser(user: any) {
    this.userBeingEdited = { ...user };
    this.editMode = true;
  }

  closeEdit() {
    const index = this.users.findIndex(u => u.email === this.userBeingEdited.email);
    if (index !== -1) {
      this.users[index] = { ...this.userBeingEdited };
    }
    this.editMode = false;
    this.userBeingEdited = null;
  }

  goBack() {
    this.location.back();
  }

  addMode = false;

  openAddUser() {
    this.addMode = true;
  }

  closeAddUser() {
    this.addMode = false;
  }

  addUser(newUser: any) {
    this.users.push(newUser);
  }

}
