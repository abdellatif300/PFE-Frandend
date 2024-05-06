import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trainer } from '../models/trainer.model';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  private url_backend = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) {}

  getTrainers(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(this.url_backend + 'trainers');
  }


  getTrainerById(trainerId: string): Observable<Trainer> {
    return this.http.get<Trainer>(this.url_backend + 'trainers/' + trainerId);
  }


  deleteTrainer(trainerId: any): Observable<Trainer> {
    return this.http.delete<Trainer>(this.url_backend + 'trainers/' + trainerId);
  }


  addTrainer(formData: FormData): Observable<Trainer> {
    return this.http.post<Trainer>(`${this.url_backend}trainers`, formData);
  }

  editTrainer(formData: FormData, id : string): Observable<Trainer> {
    return this.http.put<Trainer>(`${this.url_backend}trainers/${id}`, formData);
  }

  addTrainerExtern(formData: FormData): Observable<Trainer> {
    return this.http.post<Trainer>(`${this.url_backend}trainers/extern`, formData);
  }

  validateTrainerExtern(id: string): Observable<boolean> {
  return this.http.post<boolean>(this.url_backend + 'trainers/validate/' + id, {});
}


}
