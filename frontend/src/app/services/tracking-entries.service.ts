import { HttpClient } from '@angular/common/http';
import { TrackFoodEvent } from '../data/events/track-food-event';
import { TrackFoodRequest } from '../data/requests/track-food-request.model';
import MealType from '../data/meal-type.enum';
import { Injectable, signal } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { TrackingEntry } from '../data/models/tracking-entry.model';
import { UpdateTrackingEntryEvent } from '../data/events/update-tracking-entry-event';
import { UpdateTrackingEntryRequest } from '../data/requests/update-tracking-entry-request.model';
import { TrackingUnitSelection } from '../data/tracking-unit-selection.model';

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
    const request: TrackFoodRequest = {
      product: trackFoodEvent.product,
      mealType: mealType,
      baseUnit: trackFoodEvent.trackingUnitSelection.baseUnit,
      amount: this.calculateEffectiveAmount(
        trackFoodEvent.amount,
        trackFoodEvent.trackingUnitSelection,
      ),
      trackedInBaseUnit: trackFoodEvent.trackingUnitSelection.isBaseUnit,
    };

    return this.httpClient.post<any>(
      `/api/days/${day}/tracking-entries`,
      request,
    );
  }

  deleteEntry(trackingEntry: TrackingEntry, day: string): Observable<any> {
    return this.httpClient.delete<any>(
      `/api/days/${day}/tracking-entries/${trackingEntry.uuid}`,
    );
  }

  updateEntry(
    updateTrackingEntryEvent: UpdateTrackingEntryEvent,
    day: string,
  ): Observable<any> {
    const request: UpdateTrackingEntryRequest = {
      amount: this.calculateEffectiveAmount(
        updateTrackingEntryEvent.amount,
        updateTrackingEntryEvent.trackingUnitSelection,
      ),
      trackedInBaseUnit:
        updateTrackingEntryEvent.trackingUnitSelection.isBaseUnit,
    };

    return this.httpClient.put<any>(
      `/api/days/${day}/tracking-entries/${updateTrackingEntryEvent.originalTrackingEntry.uuid}`,
      request,
    );
  }

  private calculateEffectiveAmount(
    amount: number,
    trackingUnitSelection: TrackingUnitSelection,
  ): number {
    return trackingUnitSelection.isBaseUnit
      ? amount
      : amount * trackingUnitSelection.serving!.baseUnitAmount;
  }
}
