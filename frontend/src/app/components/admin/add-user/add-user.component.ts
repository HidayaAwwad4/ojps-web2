// add-user.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "../../navbar/navbar.component";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  standalone: true,
    imports: [FormsModule, CommonModule, NavbarComponent]
})
export class AddUserComponent {
  @Output() close = new EventEmitter<void>();
  @Output() userAdded = new EventEmitter<any>();

  user = {
    name: '',
    email: '',
    type: 'Job Seeker',
    password: '',
    location: ''
  };

  save() {
    this.userAdded.emit({ ...this.user });
    this.close.emit();
  }

  cancel() {
    this.close.emit();
  }
}
