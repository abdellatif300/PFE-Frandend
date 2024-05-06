import { ToastService } from './../../../../services/toast.service';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-companies-form',
  templateUrl: './companies-form.component.html',
  styleUrls: [
    './companies-form.component.css',
    './../../../layout/layout.component.css',
    './.././../../layout/bootstrap-overwrite.css',
  ],
})
export class CompaniesFormComponent {
  companyForm!: FormGroup;

  constructor(private fb: FormBuilder, private companyService: CompanyService, private toast: ToastService) {}

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      url: [''],
    });
  }

  onSubmit(): void {
    if (
      this.companyForm.get('name')?.valid &&
      this.companyForm.get('address')?.valid &&
      this.companyForm.get('email')?.valid
    ) {
      this.companyService.addCompany(this.companyForm.value).subscribe(
        (response) => {
          this.toast.showSuccess('Company has been added successfully!');
          this.resetForm();
        },
        (error) => {
          this.toast.showError('Error adding company');
        }
      );
    } else {
      console.log(
        this.companyForm.get('name')?.valid , '|',
        this.companyForm.get('address')?.valid , '|',
        this.companyForm.get('email')?.valid
      );

      if (!this.companyForm.get('name')?.valid) {
        this.toast.showWarn('Please enter a valid company name!');
        return;
      }

      if (!this.companyForm.get('address')?.valid) {
        this.toast.showWarn('Please enter a valid address!');
        return;
      }

      if (!this.companyForm.get('email')?.valid) {
        this.toast.showWarn('Please enter a valid email address!');
        return;
      }

      if (!this.companyForm.get('phone')?.valid) {
        this.toast.showWarn('Please enter a valid phone number!');
        return;
      }

      this.toast.showWarn('Please fill in all required fields!');
    }
  }


  resetForm(): void {
    if (this.companyForm) {
      this.companyForm.reset({
        name: '',
        address: '',
        email: '',
        phone: '',
        url: '',
      });
    }
  }
}
