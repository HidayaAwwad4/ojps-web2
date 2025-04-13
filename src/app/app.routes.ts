import { Routes } from '@angular/router';
import { JobPostingsComponent } from './components/job-postings/job-postings.component';
import {EmployerHomeComponent} from './components/employer-home/employer-home.component';
import {ShortlistComponent} from './components/shortlist/shortlist.component';
import {CreateJobComponent} from './components/create-job/create-job.component';
export const routes: Routes = [
  { path: 'employer-home', component: EmployerHomeComponent },
  { path: 'job-postings', component: JobPostingsComponent },
  {path: 'shortlist', component: ShortlistComponent},
  {path: 'create-job', component: CreateJobComponent},
];
