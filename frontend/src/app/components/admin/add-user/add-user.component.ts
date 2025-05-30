import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class AddUserComponent {
  @Output() close = new EventEmitter<void>();
  @Output() userAdded = new EventEmitter<any>();

  user = {
    name: '',
    email: '',
    type: '',
    password: '',
    location: '',
    role_id: 0
  };

  save() {
    if (!this.user.name || this.user.name.trim() === '') {
      alert('Please enter a username.');
      return;
    }
    if (!this.user.email || this.user.email.trim() === '') {
      alert('Please enter an email.');
      return;
    }
    if (this.user.type === 'employers') {
      this.user.role_id = 1;
    } else if (this.user.type === 'job_seeker') {
      this.user.role_id = 2;
    } else {
      alert('Please select a valid user type.');
      return;
    }
    if (!this.user.password || this.user.password.length < 6) {
      alert('Password must be at least 6 characters.');
      return;
    }

    this.userAdded.emit(this.user);
    this.close.emit();
  }

  cancel() {
    this.close.emit();
  }
}
