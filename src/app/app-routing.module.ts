import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './client/home/home.component';
import { CoursesComponent } from './client/courses/courses/courses.component';
import { AboutComponent } from './client/about/about.component';
import { CourseDetailsComponent } from './client/courses/course-details/course-details.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { MainContentComponent } from './admin/content/main/main-content/main-content.component';
import { AssistantsMainComponent } from './admin/content/assistants/assistants-main/assistants-main.component';
import { CompaniesMainComponent } from './admin/content/companies/companies-main/companies-main.component';
import { TrainersMainComponent } from './admin/content/trainers/trainers-main/trainers-main.component';
import { TrainersFormComponent } from './admin/content/trainers/trainers-form/trainers-form.component';
import { CompaniesFormComponent } from './admin/content/companies/companies-form/companies-form.component';
import { AssistantsFormComponent } from './admin/content/assistants/assistants-form/assistants-form.component';
import { CoursesMainComponent } from './admin/content/courses/courses-main/courses-main.component';
import { CoursesFormComponent } from './admin/content/courses/courses-form/courses-form.component';
import { EnrollCourseComponent } from './client/courses/enroll-course/enroll-course.component';
import { GuardAuthService } from './services/guard-auth.service';
import { TrainerProfileComponent } from './admin/content/trainers/trainer-profile/trainer-profile.component';
import { PartnersComponent } from './client/partners/partners.component';
import { ParticipantMainComponent } from './admin/content/participants/participant-main/participant-main.component';
import { SortingTableComponent } from './material-components/tables/sorting-table/sorting-table.component';
import { ExternTrainerComponent } from './client/trainers/extern-trainer/extern-trainer.component';
import { CourseFeedbackComponent } from './client/courses/course-feedback/course-feedback.component';
import { AdminGuard } from './services/admin-guard.service';
import { LogoutComponent } from './auth/logout/logout.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'data/courses', component: CoursesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'course-details/:id', component: CourseDetailsComponent },
  { path: 'enroll-course/:id', component: EnrollCourseComponent },
  { path: 'course-feedback', component: CourseFeedbackComponent },

  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },

  {
    path: 'dashboard',
    component: MainContentComponent,
    canActivate: [GuardAuthService], // Apply the guard to protect access to the Dashboard component
  },
  // {
  //   path: 'main',
  //   component: MainContentComponent,
  //   canActivate: [GuardAuthService],
  // },

  {
    path: 'courses/all',
    component: CoursesMainComponent,
    canActivate: [GuardAuthService],
  },
  {
    path: 'courses',
    component: CoursesFormComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'trainers/all',
    component: TrainersMainComponent,
    canActivate: [GuardAuthService],
  },
  {
    path: 'trainers',
    component: TrainersFormComponent,
    canActivate: [AdminGuard],
  },

  { path: 'trainer-profile/:id', component: TrainerProfileComponent },
  { path: 'extern-trainer', component: ExternTrainerComponent },

  {
    path: 'assistants/all',
    component: AssistantsMainComponent,
    canActivate: [GuardAuthService],
  },

  {
    path: 'assistants',
    component: AssistantsFormComponent,
    canActivate: [AdminGuard],
  },

  {
    path: 'participants/all',
    component: ParticipantMainComponent,
    canActivate: [GuardAuthService],
  },

  {
    path: 'participants/assigned',
    component: ParticipantMainComponent,
    canActivate: [GuardAuthService],
  },

  {
    path: 'companies/all',
    component: CompaniesMainComponent,
    canActivate: [GuardAuthService],
  },
  {
    path: 'companies',
    component: CompaniesFormComponent,
    canActivate: [AdminGuard],
  },

  { path: 'partners', component: PartnersComponent },
  { path: 'sorting', component: SortingTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
