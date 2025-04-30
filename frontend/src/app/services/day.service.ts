import { Injectable, signal } from '@angular/core';
import Profile from '../data/models/profile.model';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import Day from '../data/models/day.model';

@Injectable({
  providedIn: 'root',
})
export default class DayService {
  private _day = signal<Day | null>(null);
  day$ = this._day.asReadonly();

  private _error = signal<string | null>(null);
  error$ = this._error.asReadonly();

  constructor(private httpClient: HttpClient) {}

  fetchDay(date: Date) {
    const formattedDate = date.toISOString().split('T')[0];

    this.httpClient
      .get<Day>('/api/days', { params: { day: formattedDate } })
      .pipe(
        catchError((err) => {
          console.error(err);
          this._error.set('Failed to load day information!');
          return of(null);
        }),
      )
      .subscribe((day) => {
        this._day.set(day);
      });
  }
}
