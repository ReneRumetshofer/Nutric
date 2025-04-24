import { HttpClient } from '@angular/common/http';
import { TrackFoodEvent } from '../components/track-food-screen/track-dialog/models/track-food-event';
import { TrackFoodRequest } from '../models/track-food-request.model';
import MealType from '../models/meal-type.enum';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrackingEntriesService {
  constructor(private httpClient: HttpClient) {}

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
