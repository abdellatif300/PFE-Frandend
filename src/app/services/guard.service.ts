import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor() { }

  getUserRole(): string | null {
    return localStorage.getItem('ROLE');
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }
  isAssistant(): boolean {
    return this.getUserRole() === 'ASSISTANT';
  }
  isTrainer(): boolean {
    return this.getUserRole() === 'TRAINER';
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('JWT');
  }
}
