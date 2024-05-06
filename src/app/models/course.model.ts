import { Feedback } from "./feedback.model";
import { ScheduleOut } from "./schedule.model";
import { Trainer } from "./trainer.model";

export interface Course {
  title: string;
  hours: string;
  cost: number;
  description: string;
  type: string;
  category: string;
  image: any;
  trainer: Trainer;
  schedules: ScheduleOut[];
  feedbacks: Feedback[];

  [key: string]: string | number | File | Trainer | ScheduleOut[] | Feedback[] | null;
}
