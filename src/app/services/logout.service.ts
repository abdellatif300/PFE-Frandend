import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor() { }

  logout(): void {
    localStorage.removeItem('JWT');
    localStorage.removeItem('ROLE');
    localStorage.removeItem('PHOTO');
  }
}
