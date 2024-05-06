import { Course } from "./course.model";

export interface ScheduleOut {
  title: string;
  startDate: Date;
  endDate: Date;

}

export interface ScheduleIn {
  courseId: any;
  startDate: Date;
  endDate: Date;
  // companyId: any;
}
