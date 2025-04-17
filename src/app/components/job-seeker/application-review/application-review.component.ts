import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-application-review',
  templateUrl: './application-review.component.html',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  standalone: true,
  styleUrls: ['./application-review.component.css']
})
export class ApplicationReviewComponent {
  applicationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.applicationForm = this.fb.group({
      coverLetter: ['']
    });
  }

  onSubmit() {
    console.log(this.applicationForm.value);
    alert('Application submitted!');
  }

  onEditCV() {
    alert('Redirect to CV editing screen.');
  }

}
