import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { format } from 'date-fns';
import { map, Observable, throwError } from 'rxjs';
import { TodayStatuses } from './api.model';

@Injectable({
  providedIn: 'root',
})
export class TodayStatusService {
  private http = inject(HttpClient);
  private apiUrl = 'https://isdayoff.ru';

  isDayOff(date: Date, countryCode: string): Observable<boolean> {
    if (isNaN(date.getTime())) {
      return throwError(() => new Error('Invalid date'));
    }
    if (countryCode !== 'ru') {
      return throwError(() => new Error('Unsupported country code'));
    }
    const dateString = format(date, 'yyyy-MM-dd');
    return this.http.get<TodayStatuses>(`${this.apiUrl}/${dateString}?cc=${countryCode}`)
      .pipe(map(res => res === TodayStatuses.dayOff))
  }
}
