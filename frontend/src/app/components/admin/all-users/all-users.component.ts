import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForOf, NgStyle, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { AdminService } from '../../../services/admin/admin.service';
declare var bootstrap: any;

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
  standalone: true,
  imports: [NgForOf, NgStyle, FormsModule, NgIf, EditUserComponent, AddUserComponent]
})
export class AllUsersComponent implements OnInit {
  constructor(private location: Location, private adminService: AdminService) {}

  searchTerm: string = '';
  editMode = false;
  userBeingEdited: any = null;
  addMode = false;
  users: any[] = [];
  selectedUser: any = null;

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getUsers(this.searchTerm).subscribe({
      next: (data) => {
        this.users = data;
      },
      error: () => {
        alert('Failed to load users');
      }
    });
  }

  goBack() {
    this.location.back();
  }

  openAddUser() {
    this.addMode = true;
  }

  closeAddUser() {
    this.addMode = false;
  }

  addUser(newUser: any) {
    this.adminService.addUser(newUser).subscribe({
      next: (createdUser) => {
        this.users.push(createdUser.user);
        this.addMode = false;
        alert('User added successfully!');
      },
      error: (err) => {
        if (err.status === 422 && err.error && err.error.errors?.email) {
          alert('Email already exists. Please use a different email.');
        } else {
          alert('Failed to add user.');
        }
      }
    });
  }

  editUser(user: any) {
    this.userBeingEdited = { ...user };
    this.editMode = true;
  }

  saveEdit(user: any) {
    this.adminService.updateUser(user.id, user).subscribe({
      next: (updatedUser) => {
        const index = this.users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
        this.editMode = false;
        this.userBeingEdited = null;
        alert('User updated successfully!');
      },
      error: () => {
        alert('Failed to update user.');
      }
    });
  }

  closeEdit() {
    this.editMode = false;
    this.userBeingEdited = null;
  }

  openConfirmModal(user: any) {
    this.selectedUser = user;
    const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
    modal.show();
  }

  confirmDelete() {
    if (this.selectedUser) {
      this.adminService.deleteUser(this.selectedUser.id).subscribe({
        next: () => {
          this.users = this.users.filter(user => user !== this.selectedUser);
          alert('User deleted successfully!');
          this.selectedUser = null;
        },
        error: () => {
          alert('Failed to delete user.');
          this.selectedUser = null;
        }
      });
    }
  }

  onSearchTermChange() {
    this.loadUsers();
  }
}
