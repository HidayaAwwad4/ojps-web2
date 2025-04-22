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

  saveChanges() {
    this.close.emit();
  }

  cancelEdit() {
    this.close.emit();
  }
}
