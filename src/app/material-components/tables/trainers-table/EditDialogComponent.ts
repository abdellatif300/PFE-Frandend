import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Keyword } from 'src/app/models/keyword.model';
import { TrainerService } from 'src/app/services/trainer.service';
import { KeywordService } from 'src/app/services/keyword.service';
import { HttpClient } from '@angular/common/http';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-edit-dialog',
  styleUrls: ['./trainers-table.component.css'],
  templateUrl: 'EditDialogComponent.html',
})
export class EditDialogComponent {
  originalData: any;
  keywords: Keyword[] = [];
  form: any;
  selectedFile: File | null = null;
  keywordsArray: any = [];
  file: any;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private trainerService: TrainerService,
    private router: Router,
    private keywordService: KeywordService,
    private http: HttpClient,
    private toast: ToastService
  ) {
    this.keywordService.clearKeywords();
    this.originalData = { ...data.trainer };
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstname: [this.originalData.firstname, Validators.required],
      lastname: [this.originalData.lastname, Validators.required],
      email: [this.originalData.email, Validators.required],
      phone: [this.originalData.phone, Validators.required],
      password: [this.originalData.password],
      image: [],
    });

    this.fetchImageData();

    this.keywordsArray = this.originalData.keywords.split(',');
    this.keywordsArray.forEach((keyword: any) => {
      this.keywordService.addKeyword({ name: keyword });
    });
  }

  fetchImageData(): void {
    this.http.get(this.originalData.image, { responseType: 'blob' }).subscribe(
      (data: any) => {
        this.file = new File([data], 'image.jpg', { type: 'image/jpeg' });
      },
      (error) => {
        console.error('Error fetching image:', error);
      }
    );
  }

  onSaveClick(): void {
    this.dialogRef.close();

    this.keywords = this.keywordService.getKeywords();

    const keys = this.keywords.map((key) => key.name).join(',');

    console.log(keys);

    const formData = new FormData();
    formData.append('firstname', this.form.get('firstname')?.value);
    formData.append('lastname', this.form.get('lastname')?.value);
    formData.append('email', this.form.get('email')?.value);
    formData.append('phone', this.form.get('phone')?.value);
    formData.append('password', this.form.get('password')?.value);
    formData.append('keywords', keys);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    } else {
      formData.append('image', this.file);
    }
    this.trainerService.editTrainer(formData, this.originalData.id).subscribe(
      (newTrainer) => {
        this.toast.showSuccess('Trainer updated successfully!');
        location.reload();
      },
      (error) => {
        console.error('Error adding trainer:', error);
      }
    );
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }
}
