import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toast: NgToastService) {}

  showSuccess(message: string) {
    this.toast.success({
      detail: 'SUCCESS',
      summary: message,
      duration: 5000,
    });
  }

  showError(message: string) {
    this.toast.error({
      detail: 'ERROR',
      summary: message,
      sticky: true,
      duration: 5000,
    });
  }

  showInfo(message: string) {
    this.toast.info({
      detail: 'INFO',
      summary: message,
      sticky: true,
      duration: 5000,
    });
  }

  showWarn(message: string) {
    this.toast.warning({
      detail: 'WARNING',
      summary: message,
      duration: 5000,
    });
  }
}
