import { Component, effect, OnInit } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { Tag } from 'primeng/tag';
import { MealCardComponent } from './meal-card/meal-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import MealType, { mapMealTypeToGerman } from '../../data/meal-type.enum';
import ProfileService from '../../services/profile.service';
import DayService from '../../services/day.service';
import { TrackingEntriesService } from '../../services/tracking-entries.service';
import { TrackingEntry } from '../../data/models/tracking-entry.model';
import { toDayString } from '../../utils/date.utils';
import { firstValueFrom } from 'rxjs';
import { UpdateTrackingEntryEvent } from '../../data/events/update-tracking-entry-event';
import { Button } from 'primeng/button';
import { Divider } from 'primeng/divider';
import Day from '../../data/models/day.model';

@Component({
  selector: 'app-dashboard',
  imports: [ProgressBarComponent, Tag, MealCardComponent, Button, Divider],
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
    private route: ActivatedRoute,
    protected profileService: ProfileService,
    protected dayService: DayService,
    protected trackingEntriesService: TrackingEntriesService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const dayParam = params['day'];
      if (dayParam) {
        this.selectedDay = new Date(dayParam);

        // Validation
        if (isNaN(this.selectedDay.getTime())) {
          console.error('Invalid date in query param:', dayParam);
          this.selectedDay = new Date();
        }
      } else {
        this.selectedDay = new Date();
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { day: toDayString(this.selectedDay) },
          queryParamsHandling: 'merge',
          replaceUrl: true,
        });
      }
    });

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

  onProfileButtonClick(): void {
    this.router.navigate(['/profile']);
  }

  changeDay(difference: number): void {
    const newDate = new Date(this.selectedDay);
    newDate.setDate(newDate.getDate() + difference);
    this.changeToDate(newDate);
  }

  changeToDate(date: Date): void {
    this.selectedDay = date;
    this.dayService.fetchDay(this.selectedDay);
    this.fetchTrackingEntries();

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { day: toDayString(this.selectedDay) },
      queryParamsHandling: 'merge',
    });
  }

  changeToToday(): void {
    const today = new Date();
    this.changeToDate(today);
  }

  get effectiveDay(): Day | null {
    const day = this.dayService.day$();
    if (!day) {
      const profile = this.profileService.profile$();
      if (!profile) {
        return null;
      }

      return {
        day: toDayString(this.selectedDay),
        calorieGoal: profile.calorieGoal,
        proteinLimitGrams: profile.proteinLimitGrams,
        carbLimitGrams: profile.carbLimitGrams,
        fatLimitGrams: profile.fatLimitGrams,
      };
    }
    return day;
  }

  get isToday(): boolean {
    const today = new Date();
    return (
      this.selectedDay.getDate() === today.getDate() &&
      this.selectedDay.getMonth() === today.getMonth() &&
      this.selectedDay.getFullYear() === today.getFullYear()
    );
  }

  get currentDayFormatted(): string {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const selectedDay = new Date(this.selectedDay);

    if (selectedDay.toDateString() === today.toDateString()) {
      return 'Heute';
    } else if (selectedDay.toDateString() === yesterday.toDateString()) {
      return 'Gestern';
    } else if (selectedDay.toDateString() === tomorrow.toDateString()) {
      return 'Morgen';
    } else {
      return selectedDay.toLocaleDateString('de-DE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
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
  protected readonly Date = Date;
}
