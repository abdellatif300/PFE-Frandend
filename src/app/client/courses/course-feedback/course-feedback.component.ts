import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Participant } from 'src/app/models/participant.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { ParticipantService } from 'src/app/services/participant.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-course-feedback',
  templateUrl: './course-feedback.component.html',
  styleUrls: ['./course-feedback.component.css'],
})
export class CourseFeedbackComponent {
  feedbackForm!: FormGroup;
  courseId: any;
  participantId: any;
  participant ? : Participant ;
  success : boolean = false

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private feedbackService: FeedbackService,
    private participantService : ParticipantService,
    private toast: ToastService

  ) {}

  ngOnInit() {
    // this.courseId = this.route.snapshot.queryParams['courseId'];
    // this.participantId = this.route.snapshot.queryParams['participantId'];


    const hash = window.location.href.split('?')[1]
    console.log(hash);
    const decodedString = atob(hash.replace(/-/g, '+').replace(/_/g, '/'));
    console.log(decodedString);


    const params = new URLSearchParams(decodedString);
    this.courseId = params.get('courseId');
    this.participantId = params.get('participantId');



    // getting participant using participantId
    this.participantService.getParticipantById(this.participantId)
      .subscribe((participant) => {
        this.participant = participant;

      }, error => {
        console.error('Error fetching participant:', error);
      });

    this.createForm();
  }


  createForm() {
    this.feedbackForm = this.fb.group({
      comments: ['', Validators.required],
      score: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
    });
  }

  onSubmit() {
    if (this.feedbackForm.valid) {
      const feedbackData = {
        comments: this.feedbackForm.get('comments')!.value,
        score: this.feedbackForm.get('score')!.value,
        courseId: this.courseId,
        participantId : this.participantId
      };


      this.feedbackService.addFeedback(feedbackData).subscribe((data) => {
        console.log(data);
        this.toast.showSuccess("your feedback added successfully! thank you")
        this.success = true

       });
    }
  }

}
