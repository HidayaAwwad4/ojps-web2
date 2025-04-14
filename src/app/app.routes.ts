import { Routes } from '@angular/router';
import { JobPostingsComponent } from './components/job-postings/job-postings.component';
import {EmployerHomeComponent} from './components/employer-home/employer-home.component';
import {DashboardAdminComponent} from './components/dashboard-admin/dashboard-admin.component';
import {ManageEmployersComponent} from './components/dashboard-admin/manage-employers/manage-employers.component';
import {AllUsersComponent} from './components/dashboard-admin/all-users/all-users.component';
import {JobListingsComponent} from './components/dashboard-admin/job-listings/job-listings.component';
import {HomepageComponent} from './components/home-page/home-page.component';
import {ShortlistComponent} from './components/shortlist/shortlist.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {LoginComponent}from './components/login/login.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {VerifyCodeComponent} from './components/verify-code/verify-code.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import {ChoseUserTypeComponent} from './components/chose-user-type/chose-user-type.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'type', component: ChoseUserTypeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-code', component: VerifyCodeComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'home-page', component: HomepageComponent },
  { path: 'employer-home', component: EmployerHomeComponent },
  { path: 'employer/job-postings', component: JobPostingsComponent },
  { path: 'dashboard-admin', component: DashboardAdminComponent },
  { path: 'admin/manage-employers', component: ManageEmployersComponent},
  { path: 'admin/all-users', component: AllUsersComponent },
  { path: 'admin/job-listings', component: JobListingsComponent },
  {path: 'employer/shortlist', component: ShortlistComponent},
];
