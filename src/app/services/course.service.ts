import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';


@Injectable({
  providedIn: 'root',
})

export class CourseService {

  private url_backend = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url_backend + 'courses');
  }


  addCourse(formData: FormData): Observable<Course> {
    return this.http.post<Course>(`${this.url_backend}courses`, formData);
  }


  deleteCourse(courseId: any): Observable<Course> {
    return this.http.delete<Course>(this.url_backend + 'courses/' + courseId);
  }


  getCourseById(courseId: any): Observable<any> {
    const url = `${this.url_backend}courses/${courseId}`;
    return this.http.get(url);
  }

  // deleteCourse(courseId: any): Observable<any> {
  //   const url = `${this.url_backend}courses/${courseId}`;
  //   return this.http.delete(url);
  // }


}
