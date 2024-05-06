import { Course } from 'src/app/models/course.model';
export interface Participant {
  id: number;
  firstname: string;
  lastname: string;
  birthday: Date;
  email: string;
  phone: string;
  city: string;
  evaluated: boolean;
  assigned: boolean;
  courseId: number;
  course: Course;


  [key: string]: string | Date | number | boolean | Course | null;
}
