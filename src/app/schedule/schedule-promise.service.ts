import { Schedule } from './../model/schedule';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SchedulePromiseService {
  URL = 'http://localhost:3000/schedules';
  URL_PT = 'http://localhost:3000/horarios';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Promise<any> {
    return this.httpClient.get(this.URL)
               .toPromise();
  }

  save(schedule: Schedule): Promise<any> {
    return this.httpClient
      .post<Schedule>(
        this.URL,
        JSON.stringify(schedule),
        this.httpOptions
      )
      .toPromise();
  }

  getById(id: string): Promise<any> {
    return this.httpClient.get<Schedule[]>(`${this.URL_PT}/${id}`).toPromise();
  }

  patch(schedule: Schedule): Promise<any> {
    return this.httpClient
      .patch<Schedule>(
        `${this.URL}/${schedule.id}`,
        JSON.stringify(schedule),
        this.httpOptions
      )
      .toPromise();
  }

  update(schedule: Schedule): Promise<any> {
    return this.httpClient
      .put<Schedule>(
        `${this.URL}/${schedule.id}`,
        JSON.stringify(schedule),
        this.httpOptions
      )
      .toPromise();
  }

  delete(id: string): Promise<any> {
    return this.httpClient
      .delete<Schedule>(
        `${this.URL}/${id}`)
      .toPromise();
  }
}
