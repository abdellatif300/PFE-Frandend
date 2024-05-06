import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './client/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './auth/register/register.component';
import { CoursesComponent } from './client/courses/courses/courses.component';
import { AboutComponent } from './client/about/about.component';
import { CourseDetailsComponent } from './client/courses/course-details/course-details.component';
import { EnrollCourseComponent } from './client/courses/enroll-course/enroll-course.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SidebarComponent } from './admin/layout/sidebar/sidebar.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { AssistantsMainComponent } from './admin/content/assistants/assistants-main/assistants-main.component';
import { CompaniesMainComponent } from './admin/content/companies/companies-main/companies-main.component';
import { MainContentComponent } from './admin/content/main/main-content/main-content.component';
import { TrainersMainComponent } from './admin/content/trainers/trainers-main/trainers-main.component';
import { TagsInputComponent } from './material-components/tags-input/tags-input.component';
import { MatChipsModule } from '@angular/material/chips';
import { TrainersFormComponent } from './admin/content/trainers/trainers-form/trainers-form.component';
import { MatTableModule } from '@angular/material/table';
import { TrainersTableComponent } from './material-components/tables/trainers-table/trainers-table.component';
import { LoaderComponent } from './material-components/loader/loader.component';
import { Interceptor } from './inteceptors';
import { CompaniesFormComponent } from './admin/content/companies/companies-form/companies-form.component';
import { CompaniesTableComponent } from './material-components/tables/companies-table/companies-table.component';
import { AssistantsTableComponent } from './material-components/tables/assistants-table/assistants-table.component';
import { AssistantsFormComponent } from './admin/content/assistants/assistants-form/assistants-form.component';
import { CoursesFormComponent } from './admin/content/courses/courses-form/courses-form.component';
import { CoursesMainComponent } from './admin/content/courses/courses-main/courses-main.component';
import { CoursesTableComponent } from './material-components/tables/courses-table/courses-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  MatPseudoCheckboxModule,
} from '@angular/material/core';
import { TrainerProfileComponent } from './admin/content/trainers/trainer-profile/trainer-profile.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { NavbarComponent } from './client/navbar/navbar.component';
import { BannerComponent } from './client/home/banner/banner.component';
import { FeaturesComponent } from './client/home/features/features.component';
import { LearningComponent } from './client/home/learning/learning.component';
import { SpecialCoursesComponent } from './client/home/special-courses/special-courses.component';
import { AdvancedFeatureComponent } from './client/home/advanced-feature/advanced-feature.component';
import { ReviewsComponent } from './client/home/reviews/reviews.component';
import { FooterComponent } from './client/footer/footer.component';
import { PartnersComponent } from './client/partners/partners.component';
import { ParticipantsTableComponent } from './admin/content/participants/participants-table/participants-table.component';
import { ParticipantMainComponent } from './admin/content/participants/participant-main/participant-main.component';
import { SortingTableComponent } from './material-components/tables/sorting-table/sorting-table.component';
import { ExternTrainerComponent } from './client/trainers/extern-trainer/extern-trainer.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ParticipantDialogComponent } from './admin/content/participants/participant-dialog/participant-dialog.component';
import { AssignedParticipantTableComponent } from './admin/content/participants/assigned-participant-table/assigned-participant-table.component';
import { CourseFeedbackComponent } from './client/courses/course-feedback/course-feedback.component';
import { CalendarComponent } from './admin/content/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { LogoutComponent } from './auth/logout/logout.component';
import { PlanningModalComponent } from './admin/content/planning-modal/planning-modal.component';
import { NgToastModule } from 'ng-angular-popup';
import { EditDialogComponent } from './material-components/tables/trainers-table/EditDialogComponent';
import { ImagePopupComponent } from './material-components/image-popup/image-popup.component';
import { TextPopupComponent } from './material-components/text-popup/text-popup.component';
import { EditComponentComponent } from './material-components/tables/courses-table/edit-component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    CoursesComponent,
    AboutComponent,
    CourseDetailsComponent,
    EnrollCourseComponent,
    LayoutComponent,
    SidebarComponent,
    MainContentComponent,
    AssistantsMainComponent,
    CompaniesMainComponent,
    TrainersMainComponent,
    TagsInputComponent,
    TrainersFormComponent,
    TrainersTableComponent,
    LoaderComponent,
    ParticipantMainComponent,
    CompaniesFormComponent,
    CompaniesTableComponent,
    AssistantsTableComponent,
    AssistantsFormComponent,
    CoursesTableComponent,
    CoursesFormComponent,
    CoursesMainComponent,
    TrainerProfileComponent,
    NavbarComponent,
    BannerComponent,
    FeaturesComponent,
    LearningComponent,
    SpecialCoursesComponent,
    AdvancedFeatureComponent,
    ReviewsComponent,
    FooterComponent,
    PartnersComponent,
    ParticipantsTableComponent,
    SortingTableComponent,
    ExternTrainerComponent,
    ParticipantDialogComponent,
    AssignedParticipantTableComponent,
    CourseFeedbackComponent,
    CalendarComponent,
    LogoutComponent,
    EditDialogComponent,
    PlanningModalComponent,
    ImagePopupComponent,
    TextPopupComponent,
    EditComponentComponent,

  ],
  imports: [
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatTableModule,
    NgbModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    FullCalendarModule,
    NgToastModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
