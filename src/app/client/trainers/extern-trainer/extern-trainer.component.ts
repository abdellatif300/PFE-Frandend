import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Keyword } from 'src/app/models/keyword.model';
import { KeywordService } from 'src/app/services/keyword.service';
import { ToastService } from 'src/app/services/toast.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-extern-trainer',
  templateUrl: './extern-trainer.component.html',
  styleUrls: ['./extern-trainer.component.css'],
})
export class ExternTrainerComponent {
  keywords: Keyword[] = [];

  constructor(
    private fb: FormBuilder,
    private trainerService: TrainerService,
    private keywordService: KeywordService,
    private router: Router,
    private toast: ToastService
  ) {
    this.keywords = this.keywordService.getKeywords();
  }

  form: any;
  selectedFile: File | null = null;

  ngOnInit(): void {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required, Validators.length === 10],
      password: ['', Validators.required],
      image: [null, Validators.required],
    });
  }

  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }
  onSubmit(): void {

    console.log(

      this.selectedFile ,'\n',
      this.form.get('firstname')?.valid ,'\n',
      this.form.get('lastname')?.valid ,'\n',
      this.form.get('email')?.valid ,'\n',
      this.form.get('phone')?.valid ,'\n',
      this.form.get('password')?.valid ,'\n'

    );


    if (
      this.selectedFile &&
      this.form.get('firstname')?.valid &&
      this.form.get('lastname')?.valid &&
      this.form.get('email')?.valid &&
      this.form.get('phone')?.valid &&
      this.form.get('password')?.valid
    ) {
      const formData = new FormData();
      console.log('keywords: ', this.keywords);

      const keys = this.keywords.map((key) => key.name).join(',');

      formData.append('firstname', this.form.get('firstname')?.value);
      formData.append('lastname', this.form.get('lastname')?.value);
      formData.append('email', this.form.get('email')?.value);
      formData.append('phone', this.form.get('phone')?.value);
      formData.append('password', this.form.get('password')?.value);
      formData.append('image', this.selectedFile);
      formData.append('keywords', keys);

      this.trainerService.addTrainerExtern(formData).subscribe(
        (newTrainer) => {
          console.log('Trainer added successfully:', newTrainer);
          this.toast.showSuccess('Trainer added successfully!');
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error adding trainer:', error);
          this.toast.showError('Error adding trainer!');
          // Handle error as needed
        }
      );
    } else {


      if(!this.form.get('firstname')?.valid)
        this.toast.showWarn('Firstname is required');

      if(!this.form.get('lastname')?.valid)
        this.toast.showWarn('Lastname is required');

      if(!this.form.get('phone')?.valid)
        this.toast.showWarn('Phone Number is invalid');

      if(!this.form.get('email')?.valid)
          this.toast.showWarn('Email is invalid!');

      if(!this.form.get('password')?.valid)
        this.toast.showWarn('Password is required');


      if(!this.selectedFile) {
        this.toast.showWarn('No file selected!');
      }



    }
  }
}
