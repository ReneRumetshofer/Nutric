import { Component, OnInit } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { Tag } from 'primeng/tag';
import { MealCardComponent } from './meal-card/meal-card.component';
import { Router } from '@angular/router';
import MealType, { mapMealTypeToGerman } from '../../data/meal-type.enum';
import ProfileService from '../../services/profile.service';
import DayService from '../../services/day.service';
import { TrackingEntriesService } from '../../services/tracking-entries.service';
import { TrackingEntry } from '../../data/models/tracking-entry.model';
import { toDayString } from '../../utils/date.utils';
import { firstValueFrom } from 'rxjs';
import { UpdateTrackingEntryEvent } from '../../data/events/update-tracking-entry-event';

@Component({
  selector: 'app-dashboard',
  imports: [ProgressBarComponent, Tag, MealCardComponent],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  selectedDay: Date = new Date(Date.now());
  mealTypes: MealType[] = [
    MealType.BREAKFAST,
    MealType.LUNCH,
    MealType.DINNER,
    MealType.SNACKS,
  ];

  constructor(
    private router: Router,
    protected profileService: ProfileService,
    protected dayService: DayService,
    protected trackingEntriesService: TrackingEntriesService,
  ) {}

  ngOnInit(): void {
    this.profileService.fetchProfile();
    this.dayService.fetchDay(this.selectedDay);
    this.fetchTrackingEntries();
  }

  onAddFood(mealType: MealType): void {
    const dayFormatted = toDayString(this.selectedDay);

    this.router.navigate(['/track'], {
      queryParams: {
        day: dayFormatted,
        mealType: mealType,
      },
    });
  }

  async onDeleteTrackingEntry(trackingEntry: TrackingEntry): Promise<void> {
    const dayFormatted = toDayString(this.selectedDay);

    await firstValueFrom(
      this.trackingEntriesService.deleteEntry(trackingEntry, dayFormatted),
    );
    this.fetchTrackingEntries();
  }

  async onUpdateTrackingEntry(
    updateTrackingEntryEvent: UpdateTrackingEntryEvent,
  ): Promise<void> {
    const dayFormatted = toDayString(this.selectedDay);

    await firstValueFrom(
      this.trackingEntriesService.updateEntry(
        updateTrackingEntryEvent,
        dayFormatted,
      ),
    );
    this.fetchTrackingEntries();
  }

  fetchTrackingEntries(): void {
    this.trackingEntriesService.fetchByDay(this.selectedDay);
  }

  getTrackingEntriesForMealType(mealType: MealType) {
    if (!this.trackingEntriesService.trackingEntries$()) {
      return [];
    }

    return this.trackingEntriesService
      .trackingEntries$()!
      .filter((entry) => entry.mealType === mealType);
  }

  get totalUsedCalories(): number {
    if (!this.trackingEntriesService.trackingEntries$()) {
      return 0;
    }

    return this.trackingEntriesService
      .trackingEntries$()!
      .reduce(
        (acc, entry) => acc + entry.amount * entry.nutritionPerBaseUnit.energy,
        0,
      );
  }

  get totalUsedCarbs(): number {
    if (!this.trackingEntriesService.trackingEntries$()) {
      return 0;
    }

    return this.trackingEntriesService
      .trackingEntries$()!
      .reduce(
        (acc, entry) => acc + entry.amount * entry.nutritionPerBaseUnit.carbs,
        0,
      );
  }

  get totalUsedProtein(): number {
    if (!this.trackingEntriesService.trackingEntries$()) {
      return 0;
    }

    return this.trackingEntriesService
      .trackingEntries$()!
      .reduce(
        (acc, entry) => acc + entry.amount * entry.nutritionPerBaseUnit.protein,
        0,
      );
  }

  get totalUsedFat(): number {
    if (!this.trackingEntriesService.trackingEntries$()) {
      return 0;
    }

    return this.trackingEntriesService
      .trackingEntries$()!
      .reduce(
        (acc, entry) => acc + entry.amount * entry.nutritionPerBaseUnit.fat,
        0,
      );
  }

  get caloriesLeftFormatted(): string {
    const day = this.dayService.day$();
    if (!day) {
      return `${this.totalUsedCalories} gegessen`;
    }

    const caloriesLeft = day.calorieGoal - this.totalUsedCalories;
    if (caloriesLeft < 0) {
      return `${(-1 * caloriesLeft).toFixed(0)} zu viel`;
    }
    return `${caloriesLeft.toFixed(0)} übrig`;
  }

  protected readonly MealType = MealType;
  protected readonly mapMealTypeToGerman = mapMealTypeToGerman;
}
