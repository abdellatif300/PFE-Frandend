import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-special-courses',
  templateUrl: './special-courses.component.html',
  styleUrls: ['./../home.component.css', './special-courses.component.css'],
})
export class SpecialCoursesComponent implements OnInit {
  constructor(private service: CourseService) {}

  courses?: any[];

  ngOnInit() {
    this.getCourses();
    // Do something else after courses are fetched
  }

  async getCourses() {
    try {
      const allCourses = await this.service.getCourses().toPromise();
      // Get only the first 3 courses
      this.courses = allCourses?.slice(0, 3);
      console.log(this.courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }
}
