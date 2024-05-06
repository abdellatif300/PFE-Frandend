import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course.model';
import { TrainerService } from 'src/app/services/trainer.service';
import { Router } from '@angular/router';
import { Trainer } from 'src/app/models/trainer.model';
import { ToastService } from 'src/app/services/toast.service';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: [
    './courses-form.component.css',
    './../../../layout/layout.component.css',
    './.././../../layout/bootstrap-overwrite.css',
  ],
})
export class CoursesFormComponent implements OnInit {
  form!: FormGroup;
  selectedFile: File | null = null;
  courses: Course[] = [];
  trainers: Trainer[] = [];
  companies: Company[] = [];
  types = ["COMPANY", "PARTICIPANT"]


  constructor(private fb: FormBuilder, private courseService: CourseService,
    private trainerService: TrainerService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private toast: ToastService,
    private companyService: CompanyService,

  ) {}


  getTrainers(): void {
    this.trainerService.getTrainers()
      .subscribe(
        (data: Trainer[]) => {
          console.log('fetch trainers:', data);


          // Update trainers and trigger change detection
          this.trainers = data.filter(trainer => trainer.active);
          this.changeDetectorRef.detectChanges();
        },
        error => {
          console.error('Error fetching trainers:', error);
        }
      );
  }

  getCompanies(): void {
    this.companyService.getCompanies().subscribe(
      (data: Company[]) => {
        console.log('fetch companies:', data);

        this.companies = data;
        this.changeDetectorRef.detectChanges();


      },
      (error) => {
        console.error('Error fetching companies:', error);
      }
    );
  }

  ngOnInit(): void {
    this.getTrainers();
    this.getCompanies();


    this.form = this.fb.group({
      title: ['', Validators.required],
      hours: [, [Validators.required, Validators.min(1)]],
      cost: [, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      type: ['', Validators.required],
      category: ['', Validators.required],
      image: [null, Validators.required],
      trainerId: [null, Validators.required],
      companyId: [null], // Add companyId field to the form
    });
  }

  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }

  onSubmit(): void {
    if (this.form.valid && this.selectedFile) {

      console.log('companyId : ', this.form.get('companyId')?.value);


      const formData = new FormData();

      formData.append('title', this.form.get('title')?.value);
      formData.append('hours', this.form.get('hours')?.value);
      formData.append('cost', this.form.get('cost')?.value);
      formData.append('description', this.form.get('description')?.value);
      formData.append('type', this.form.get('type')?.value);
      formData.append('category', this.form.get('category')?.value);
      formData.append('image', this.selectedFile);
      formData.append('trainerId', this.form.get('trainerId')?.value);

      console.log('formData: ', formData.get('companyId'));
      if(this.form.get('companyId')?.value)
        formData.append('companyId', this.form.get('companyId')?.value);

        console.log('formData22: ', formData.get('companyId'));


      this.courseService.addCourse(formData).subscribe(
        (newCourse) => {
          console.log('Course added successfully:', newCourse);
          this.toast.showSuccess('Course added successfully!');

          // this.form.reset();
          this.selectedFile = null;
          this.router.navigate(['/courses/all'])
        },
        (error) => {
          console.error('Error adding course:', error);
          this.toast.showError('Error adding course!');
        }
      );
    } else {
      if (!this.selectedFile) {
        this.toast.showWarn('Please select an image !');
      } else {
        this.toast.showWarn('All fields are required !');
      }
    }
  }


  selectTrainer(event: any): void {
    const trainerId = event.target.value;
    this.form.get('trainerId')?.setValue(trainerId);
  }


  selectCompany(event: any): void {
    const companyId = event.target.value;
    this.form.get('companyId')?.setValue(companyId);
  }


  selectType(event: any): void {
    const type = event.target.value;
    this.form.get('type')?.setValue(type);

    if (type !== 'COMPANY') {
      this.form.get('companyId')?.setValue(null);
    }
  }


}
