import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { LastTrackedFood } from '../data/models/last-tracked-food.model';

@Injectable({
  providedIn: 'root',
})
export default class LastTrackedFoodService {
  private _lastTrackedFoods = signal<LastTrackedFood[] | null>(null);
  lastTrackedFoods$ = this._lastTrackedFoods.asReadonly();

  private _error = signal<string | null>(null);
  error$ = this._error.asReadonly();

  private _loading = signal<boolean>(false);
  loading$ = this._loading.asReadonly();

  constructor(private httpClient: HttpClient) {}

  loadLastTrackedFood() {
    this._loading.set(true);
    this._error.set(null);

    this.httpClient
      .get<LastTrackedFood[]>('/api/tracking-entries/last-tracked')
      .pipe(
        catchError((err) => {
          console.error(err);
          this._loading.set(false);
          this._error.set('Failed to load last tracked foods!');
          return of(null);
        }),
      )
      .subscribe((searchResults) => {
        this._loading.set(false);
        this._lastTrackedFoods.set(searchResults);
      });
  }

  reset(): void {
    this._loading.set(false);
    this._error.set(null);
    this._lastTrackedFoods.set(null);
  }
}
