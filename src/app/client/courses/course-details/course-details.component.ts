import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: [
    './course-details.component.css',
    './../../../../assets/css/bootstrap.min.css',
    './../../../../assets/css/animate.css',
    './../../../../assets/css/owl.carousel.min.css',
    './../../../../assets/css/themify-icons.css',
    './../../../../assets/css/flaticon.css',
    './../../../../assets/css/magnific-popup.css',
    './../../../../assets/css/slick.css',
    './../../../../assets/css/style.css'
  ],
})
export class CourseDetailsComponent implements OnInit {

  courseId: any;
  courseDetails: any;

  constructor(private route: ActivatedRoute, private courseService: CourseService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id');
      console.log(this.courseId);


      // Fetch course details using courseId
      this.courseService.getCourseById(this.courseId).subscribe((data) => {
        this.courseDetails = data;
        console.log(this.courseDetails);

      });
    });
  }
}
