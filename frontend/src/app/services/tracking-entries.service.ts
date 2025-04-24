import { HttpClient } from '@angular/common/http';
import { TrackFoodEvent } from '../components/track-food-screen/track-dialog/models/track-food-event';
import { TrackFoodRequest } from '../models/track-food-request.model';
import MealType from '../models/meal-type.enum';
import { Injectable, signal } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { TrackingEntry } from '../models/tracking-entry.model';

@Injectable({
  providedIn: 'root',
})
export class TrackingEntriesService {
  private _trackingEntries = signal<TrackingEntry[] | null>(null);
  trackingEntries$ = this._trackingEntries.asReadonly();

  private _error = signal<string | null>(null);
  error$ = this._error.asReadonly();

  private _loading = signal<boolean>(false);
  loading$ = this._loading.asReadonly();

  constructor(private httpClient: HttpClient) {}

  fetchByDay(date: Date): void {
    const formattedDate = date.toISOString().split('T')[0];

    this._loading.set(true);
    this._error.set(null);

    this.httpClient
      .get<TrackingEntry[]>(`/api/days/${formattedDate}/tracking-entries`)
      .pipe(
        catchError((err) => {
          console.error(err);
          this._loading.set(false);
          this._error.set('Failed to load tracking entries!');
          return of(null);
        }),
      )
      .subscribe((trackingEntries) => {
        this._loading.set(false);
        this._trackingEntries.set(trackingEntries);
      });
  }

  trackFood(
    trackFoodEvent: TrackFoodEvent,
    day: string,
    mealType: MealType,
  ): Observable<any> {
    const amount = trackFoodEvent.trackingUnitSelection.isBaseUnit
      ? trackFoodEvent.amount
      : trackFoodEvent.amount *
        trackFoodEvent.trackingUnitSelection.serving!.baseUnitAmount;
    const request: TrackFoodRequest = {
      product: trackFoodEvent.product,
      mealType: mealType,
      baseUnit: trackFoodEvent.trackingUnitSelection.baseUnit,
      amount: amount,
    };

    return this.httpClient.post<any>(
      `/api/days/${day}/tracking-entries`,
      request,
    );
  }
}
