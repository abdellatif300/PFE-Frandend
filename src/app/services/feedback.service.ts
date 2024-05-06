import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private url_backend = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) {}

  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.url_backend + 'feedbacks');
  }

  addFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(`${this.url_backend}feedbacks`, feedback);
  }
}
