import { Feedback } from './../../../models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: [ './../home.component.css', './reviews.component.css']
})
export class ReviewsComponent implements OnInit{

  feedbacks!: Feedback[];
  ngOnInit(): void {
    this.getFeedbacks()
  }
  constructor(private feedbackService: FeedbackService){}

  getFeedbacks() {
    this.feedbackService.getFeedbacks().subscribe(
      (data) => {
        console.log('fetch feedbacks:', data);

        this.feedbacks = data.slice(0, 3);
      },
      error => {
        console.error('Error fetching feedbacks:', error);
      }
    );
  }
}
