import { Injectable, signal } from '@angular/core';
import Profile from '../data/models/profile.model';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import Day from '../data/models/day.model';

@Injectable({
  providedIn: 'root',
})
export default class SelectedDateService {
  private _selectedDate = signal<Date | null>(null);
  selectedDate$ = this._selectedDate.asReadonly();

  constructor(private httpClient: HttpClient) {}

  setSelectedDate(date: Date) {
    this._selectedDate.set(date);
  }
}
