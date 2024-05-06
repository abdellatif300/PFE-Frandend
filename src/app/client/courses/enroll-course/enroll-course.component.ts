// enroll-course.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParticipantService } from 'src/app/services/participant.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-enroll-course',
  templateUrl: './enroll-course.component.html',
  styleUrls: ['./enroll-course.component.css'],
})
export class EnrollCourseComponent implements OnInit {
  participantForm!: FormGroup;
  courseId: any;

  constructor(
    private fb: FormBuilder,
    private participantService: ParticipantService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.courseId = params.get('id');
    });

    this.participantForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      birthday: ['', [Validators.required, this.validateDate.bind(this)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      city: [''],
      courseId: +this.courseId,
    });
  }

  validateDate(control: any) {
    const isValid = /\d{4}-\d{2}-\d{2}/.test(control.value);
    return isValid ? null : { invalidDateFormat: true };
  }

  onSubmit() {
    if (this.participantForm.valid) {
      const participantData = this.participantForm.value;

      this.participantService.addParticipant(participantData).subscribe(
        (response) => {
          this.toastService.showSuccess('Participant added successfully');
          this.router.navigate(['/'])
        },
        (error) => {
          this.toastService.showError('Error adding participant');
        }
      );
    } else {
      this.toastService.showWarn('Please fill in the required fields');
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.participantForm.get(fieldName);
    return control ? control.invalid && control.touched : false;
  }
}
