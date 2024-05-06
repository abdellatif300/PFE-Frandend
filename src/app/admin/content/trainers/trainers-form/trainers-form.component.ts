import { TrainerService } from './../../../../services/trainer.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Keyword } from 'src/app/models/keyword.model';
import { KeywordService } from 'src/app/services/keyword.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-trainers-form',
  templateUrl: './trainers-form.component.html',
  styleUrls: [
    './trainers-form.component.css',
    './../../../layout/layout.component.css',
    './.././../../layout/bootstrap-overwrite.css'
  ]
})
export class TrainersFormComponent implements OnInit{

  keywords: Keyword[] = [];

  constructor(private fb: FormBuilder, private trainerService: TrainerService,
    private toast: ToastService,
     private keywordService: KeywordService, private router: Router) {
    this.keywords = this.keywordService.getKeywords();
  }

  form: any;
  selectedFile: File | null = null;



  ngOnInit(): void {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
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
    if (this.selectedFile) {
      console.log("selectedFile");
      console.log(this.form);
      console.log(this.keywords);

      const keys = this.keywords.map(key => key.name).join(',');

      console.log(keys);

      const formData = new FormData();
      formData.append('firstname', this.form.get('firstname')?.value);
      formData.append('lastname', this.form.get('lastname')?.value);
      formData.append('email', this.form.get('email')?.value);
      formData.append('phone', this.form.get('phone')?.value);
      formData.append('password', this.form.get('password')?.value);
      formData.append('keywords', keys);
      formData.append('image', this.selectedFile);

      this.trainerService.addTrainer(formData)
        .subscribe(
          (newTrainer) => {
            console.log('Trainer added successfully:', newTrainer);
            this.toast.showSuccess('Trainer added successfully')
            this.router.navigate(['/trainers/all'])
          },
          (error) => {
            console.error('Error adding trainer:', error);
            this.toast.showError('Error adding trainer');
          }
        );
    } else {
      this.toast.showWarn('No file selected');
    }
  }

}
