export interface Feedback {
  score: string;
  comments: string;
  courseId: number;
  participantId : number,


  [key: string]: string | number | null;
}
