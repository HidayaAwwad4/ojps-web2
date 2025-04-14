import { Routes } from '@angular/router';
import { JobPostingsComponent } from './components/job-postings/job-postings.component';
import {EmployerHomeComponent} from './components/employer-home/employer-home.component';
import {DashboardAdminComponent} from './components/dashboard-admin/dashboard-admin.component';
import {ManageEmployersComponent} from './components/dashboard-admin/manage-employers/manage-employers.component';
import {AllUsersComponent} from './components/dashboard-admin/all-users/all-users.component';
import {JobListingsComponent} from './components/dashboard-admin/job-listings/job-listings.component';

export const routes: Routes = [
  { path: 'employer-home', component: EmployerHomeComponent },
  { path: 'job-postings', component: JobPostingsComponent },
  { path: 'dashboard-admin', component: DashboardAdminComponent },
  { path: 'admin/manage-employers', component: ManageEmployersComponent},
  { path: 'admin/all-users', component: AllUsersComponent },
  { path: 'admin/job-listings', component: JobListingsComponent },

];
