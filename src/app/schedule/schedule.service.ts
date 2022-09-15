import { ErrorUtil } from './../util/error-util';
import { Schedule } from './../model/schedule';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  URL = 'http://localhost:3000/schedules';

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getAll(): Observable<Schedule[]> {
    return this.httpClient.get<Schedule[]>(this.URL).pipe(
      catchError(ErrorUtil.handleError)
    );
  }
}
