import { Routes } from '@angular/router';
import { JobPostingsComponent } from './components/employer/job-postings/job-postings.component';
import {EmployerHomeComponent} from './components/employer/employer-home/employer-home.component';
import {DashboardAdminComponent} from './components/admin/dashboard-admin/dashboard-admin.component';
import {ManageEmployersComponent} from './components/admin/manage-employers/manage-employers.component';
import {AllUsersComponent} from './components/admin/all-users/all-users.component';
import {JobListingsComponent} from './components/admin/job-listings/job-listings.component';
import {HomepageComponent} from './components/job-seeker/home-page/home-page.component';
import {SignUpComponent} from './components/auth/sign-up/sign-up.component';
import {LoginComponent}from './components/auth/login/login.component';
import {ForgotPasswordComponent} from './components/auth/forgot-password/forgot-password.component';
import {VerifyCodeComponent} from './components/auth/verify-code/verify-code.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import {ChoseUserTypeComponent} from './components/auth/chose-user-type/chose-user-type.component';
import {ShortlistComponent} from './components/employer/shortlist/shortlist.component';
import {JobApplicationsComponent} from './components/employer/job-applications/job-applications.component'
import {JobDetailsComponent} from './components/employer/job-details/job-details.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'type', component: ChoseUserTypeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-code', component: VerifyCodeComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'home-page', component: HomepageComponent },
  { path: 'job-applications', component: JobApplicationsComponent},
  { path: 'employer-home', component: EmployerHomeComponent },
  { path: 'employer/job-postings', component: JobPostingsComponent },
  { path: 'dashboard-admin', component: DashboardAdminComponent },
  { path: 'admin/manage-employers', component: ManageEmployersComponent},
  { path: 'admin/all-users', component: AllUsersComponent },
  { path: 'admin/job-listings', component: JobListingsComponent },
  {path: 'employer/shortlist', component: ShortlistComponent},
  {path: 'employer/job-applications', component: JobApplicationsComponent},
  {path: 'job-details', component: JobDetailsComponent},
];
