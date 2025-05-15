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
import {JobApplicationsComponent} from './components/employer/job-applications/job-applications.component';
import {JobDetailsComponent} from './components/employer/job-details/job-details.component';
import {ApplicationsStatusComponent} from './components/job-seeker/applications-status/applications-status.component';
import {CategoriesPageComponent} from './components/job-seeker/categories-page/categories-page.component';
import {ApplicationReviewComponent} from './components/job-seeker/application-review/application-review.component';
import {
  EmployerNotificationComponent
} from './components/Notification/employer-notification/employer-notification.component';
import {ResumeManagementComponent} from './components/job-seeker/resume-management/resume-management.component';
import {CandidateViewComponent} from './components/employer/candidate-view/candidate-view.component';
import {SeekerNotificationComponent} from './components/Notification/seeker-notification/seeker-notification.component';
import {EmployerReportsComponent} from './components/Reports/employer-reports/employer-reports.component';
import {AdminReportsComponent} from './components/Reports/admin-reports/admin-reports.component';
import {SignUpEmployerComponent} from './components/auth/sign-up-employer/sign-up-employer.component';
import {JobFieldCategoriesComponent} from './components/auth/job-field-categories/job-field-categories.component';
import {JobSeekerProfilePageComponent} from './components/job-seeker/profile-page/profile-page.component';
import {AdminProfilePageComponent} from './components/admin/profile-page/profile-page.component';
import {EmployerProfilePageComponent} from './components/employer/profile-page/profile-page.component';
import {EditProfilePageComponent} from './components/shared/edit-profile-page/edit-profile-page.component';
import {SavedJobsComponent} from './components/job-seeker/saved-jobs/saved-jobs.component';
import {WelcomeComponent} from './components/job-seeker/welcome/welcome.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'signup', component: SignUpComponent },
  {path: 'signup-employer',component:SignUpEmployerComponent },
  { path: 'type', component: ChoseUserTypeComponent },
  { path: 'login', component: LoginComponent },
  {path: 'field', component: JobFieldCategoriesComponent },
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
  {path: 'employer/job-applications', component: JobApplicationsComponent},
  {path: 'job-details', component: JobDetailsComponent},
  { path: 'applications-status', component: ApplicationsStatusComponent },
  {path: 'categories-page', component: CategoriesPageComponent},
  {path: 'application-review', component: ApplicationReviewComponent},
  {path: 'employer-notification', component: EmployerNotificationComponent},
  {path: 'seeker-notification', component: SeekerNotificationComponent},
  {path: 'employer-reports', component: EmployerReportsComponent},
  {path: 'admin-reports', component: AdminReportsComponent},
  { path: 'jobseeker-profile', component: JobSeekerProfilePageComponent },
  { path: 'employer-profile', component: EmployerProfilePageComponent },
  { path: 'edit-profile', component: EditProfilePageComponent },
  { path: 'admin-profile', component: AdminProfilePageComponent },
  { path: 'candidate-view', component: CandidateViewComponent},
  { path: 'resume-management', component: ResumeManagementComponent },
  { path: 'Saved-Jobs', component: SavedJobsComponent },
];
