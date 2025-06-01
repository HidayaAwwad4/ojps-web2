import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class EditUserComponent {
  @Input() user: any = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  saveChanges() {
    if (!this.user.name || !this.user.email || !this.user.role_id) {
      alert('Please fill in all required fields.');
      return;
    }
    this.save.emit(this.user);
  }

  cancelEdit() {
    this.close.emit();
  }
}
