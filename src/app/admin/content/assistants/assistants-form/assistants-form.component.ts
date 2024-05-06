import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssistantService } from 'src/app/services/assistant.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-assistants-form',
  templateUrl: './assistants-form.component.html',
  styleUrls: [
    './assistants-form.component.css',
    './../../../layout/layout.component.css',
    './.././../../layout/bootstrap-overwrite.css',
  ],
})
export class AssistantsFormComponent implements OnInit {
  form!: FormGroup; // Declare form as FormGroup

  constructor(
    private fb: FormBuilder,
    private assistantService: AssistantService,
    private toast: ToastService
  ) {}

  @ViewChild('fileInput') fileInput!: ElementRef;

  selectedFile: File | null = null;

  ngOnInit(): void {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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
    if (
      this.selectedFile &&
      this.form.get('firstname')?.value &&
      this.form.get('lastname')?.value &&
      this.form.get('email')?.value &&
      this.form.get('phone')?.value &&
      this.form.get('password')?.value
    ) {
      const formData = new FormData();

      formData.append('firstname', this.form.get('firstname')?.value);
      formData.append('lastname', this.form.get('lastname')?.value);
      formData.append('email', this.form.get('email')?.value);
      formData.append('phone', this.form.get('phone')?.value);
      formData.append('password', this.form.get('password')?.value);
      formData.append('image', this.selectedFile);

      this.assistantService.addAssistant(formData).subscribe(
        (newAssistant) => {
          console.log('Assistant added successfully:', newAssistant);
          this.toast.showSuccess('Assistant added successfully!');
          this.resetForm();
        },
        (error) => {
          console.error('Error adding assistant:', error);
          this.toast.showError('Error adding assistant!');
        }
      );
    } else {
      this.toast.showWarn('All fields are required!');
    }
  }

  resetForm(): void {
    this.form.reset();
    this.selectedFile = null;

    // Clear the file input visually
    if (this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }
}
