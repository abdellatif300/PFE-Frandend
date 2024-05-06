import { TrainersTableComponent } from './../trainers-table/trainers-table.component';
import { Course } from 'src/app/models/course.model';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Router } from '@angular/router';
import { Trainer } from 'src/app/models/trainer.model';
import { TrainerService } from 'src/app/services/trainer.service';
import { ToastService } from 'src/app/services/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { ImagePopupComponent } from '../../image-popup/image-popup.component';
import { TextPopupComponent } from '../../text-popup/text-popup.component';
import { EditDialogComponent } from '../trainers-table/EditDialogComponent';
import { EditComponentComponent } from './edit-component';

export interface TableElements {
  category: string;
  cost: number;
  description: string;
  hours: string;
  image: string;
  title: string;
  trainer: number;
  type: string;
}

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.css'],
})

export class CoursesTableComponent implements OnInit {

  constructor(
    private courseService: CourseService,
    private trainerService: TrainerService,
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private router: Router,
    private toast: ToastService
  ) {}



  courses: Course[] = [];
  trainers: Trainer[] = [];

  ngOnInit(): void {
    this.getCourses();
    this.getTrainers();
  }


  getTrainers(): void {
    this.trainerService.getTrainers()
      .subscribe(
        (data: Trainer[]) => {
          console.log('fetch trainers:', data);

          // Update trainers and trigger change detection
          this.trainers = data;
          this.changeDetectorRef.detectChanges();
        },
        error => {
          console.error('Error fetching trainers:', error);
        }
      );
  }


  getCourses(): void {
    this.courseService.getCourses()
      .subscribe(
        (data: Course[]) => {
          console.log('fetch Courses:', data);

          // Update courses and trigger change detection
          this.courses = data;
          this.changeDetectorRef.detectChanges();

        },
        error => {
          console.error('Error fetching courses:', error);
        }
      );
  }

  displayedColumns: string[] = ['title', 'category', 'trainer', 'cost', 'description', 'hours', 'image', 'type', 'action'];
  clickedRows = new Set<TableElements>();


  navigateToTrainerProfile(trainerId: number): void {
    this.router.navigate(['/trainer-profile', trainerId]);
  }




  editCourse(course: any) {
    const dialogRef = this.dialog.open(EditComponentComponent, {
      data: { course },
    });
    console.log('Edit course:', course);
  }

  deleteCourse(courseId: any) {
    this.courseService.deleteCourse(courseId).subscribe(
      (data) => {
        console.log('Delete course with ID:', courseId);
        this.changeDetectorRef.detectChanges();
        this.toast.showSuccess('Course deleted')
        this.getCourses()
      },
      error => {
        console.error('Error deleting course:', error);
        this.toast.showError('Error in deleting course')
      }
    );
  }


  onOpenImage(img: any){
    const dialogRef = this.dialog.open(ImagePopupComponent, {
      data: {
        image: img
      },
    });
  }

  onOpenText(desc: any){
    const dialogRef = this.dialog.open(TextPopupComponent, {
      data: {
        text: desc
      },
    });
  }


  // deleteCourse(id: any) {
  //   this.courseService.deleteCourse(id)
  //   .subscribe(
  //       (response) => {
  //         console.log(response);
  //         this.toast.showSuccess('Course has been deleted successfuly!');
  //       },
  //       error => {
  //         console.log(error);
  //         this.toast.showError('Error in deleting Course !');
  //       }
  //       );
  //       this.router.navigate(['/courses/all']);
  //     }



}


