import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScheduleIn, ScheduleOut } from '../models/schedule.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private url_backend = 'http://localhost:8080/api/v1/';


  constructor(private http: HttpClient) {}


  getSchedules():Observable<any[]> {
    return this.http.get<ScheduleOut[]>(this.url_backend + 'schedules');
  }

  saveSchedule(schedule:  ScheduleIn): Observable<any> {
    return this.http.post<any>(`${this.url_backend}schedules`, schedule);
  }


}
