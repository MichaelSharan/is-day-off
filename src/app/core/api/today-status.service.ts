import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TodayStatuses } from './api.model';

@Injectable({
  providedIn: 'root',
})
export class TodayStatusService {
  private http = inject(HttpClient);
  private apiUrl = 'https://isdayoff.ru';

  isDayOff(date: Date, countryCode: string): Observable<TodayStatuses> {
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    if (countryCode !== 'ru') {
      throw new Error('Unsupported country code');
    }
    return this.http.get<TodayStatuses>(`${this.apiUrl}-${countryCode}-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
      .pipe(tap(console.log))
  }
}
