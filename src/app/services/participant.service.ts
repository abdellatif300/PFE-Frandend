import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Participant } from '../models/participant.model';
import { Email } from '../models/email.model';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  private url_backend = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) {}

  getParticipants(): Observable<Participant[]> {
    return this.http.get<Participant[]>(this.url_backend + 'participants');
  }

  getParticipantById(id: number): Observable<Participant> {
    const url = `${this.url_backend}participants/${id}`;
    return this.http.get<Participant>(url);
  }


  addParticipant(participants: Participant): Observable<Participant> {
    return this.http.post<Participant>(`${this.url_backend}participants`, participants);
  }

  sendFeedbackMail(email: Email): Observable<Email> {
    return this.http.post<Email>(`${this.url_backend}emails/feedback`, email);
  }

  assignToCourse(participantId: number): Observable<string> {
    return this.http.put<string>(`${this.url_backend}participants/assign/${participantId}`, null);
  }
}
