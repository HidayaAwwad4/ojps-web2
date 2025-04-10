import { Routes } from '@angular/router';
import { JobPostingsComponent } from './components/job-postings/job-postings.component';
import {EmployerHomeComponent} from './components/employer-home/employer-home.component';

export const routes: Routes = [
  { path: 'employer-home', component: EmployerHomeComponent },
  { path: 'job-postings', component: JobPostingsComponent }
];
