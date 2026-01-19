import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { LastTrackedFood } from '../data/models/last-tracked-food.model';
import MealType from '../data/meal-type.enum';

@Injectable({
  providedIn: 'root',
})
export default class FrequentlyTrackedFoodService {
  private _frequentlyTrackedFoods = signal<LastTrackedFood[] | null>(null);
  frequentlyTrackedFoods$ = this._frequentlyTrackedFoods.asReadonly();

  private _error = signal<string | null>(null);
  error$ = this._error.asReadonly();

  private _loading = signal<boolean>(false);
  loading$ = this._loading.asReadonly();

  constructor(private httpClient: HttpClient) {}

  loadFrequentlyTrackedFood(mealType: MealType) {
    this._loading.set(true);
    this._error.set(null);

    this.httpClient
      .get<LastTrackedFood[]>('/api/tracking-entries/frequently-tracked', {
        params: {
          mealType: mealType
        }
      })
      .pipe(
        catchError((err) => {
          console.error(err);
          this._loading.set(false);
          this._error.set('Failed to load frequently tracked foods!');
          return of(null);
        }),
      )
      .subscribe((frequentlyTrackedResults) => {
        this._loading.set(false);
        this._frequentlyTrackedFoods.set(frequentlyTrackedResults);
      });
  }

  reset(): void {
    this._loading.set(false);
    this._error.set(null);
    this._frequentlyTrackedFoods.set(null);
  }
}
