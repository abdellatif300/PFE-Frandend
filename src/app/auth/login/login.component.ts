import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    this.service.login(this.loginForm.value).subscribe(
      (response) => {
        console.log(response);

        if (response.token) {
          const jwtToken = response.token;
          const role = response.role;
          const photo = response.image;

          localStorage.setItem('ROLE', role);
          localStorage.setItem('JWT', jwtToken);
          localStorage.setItem('PHOTO', photo);

          if (role === 'TRAINER')
            this.router.navigateByUrl(`/trainer-profile/${response.id}`);
          else
            this.router.navigateByUrl('/dashboard');

            this.toast.showInfo(`Welcome back ${role}`);
        }
      },
      (error) => {
        this.loginForm.reset();
        console.error(error);
        this.toast.showError(error.error.message);
      }
    );
  }
}
