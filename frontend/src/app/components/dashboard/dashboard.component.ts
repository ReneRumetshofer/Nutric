import { Component, OnInit } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { Tag } from 'primeng/tag';
import { MealCardComponent } from './meal-card/meal-card.component';
import { Router } from '@angular/router';
import MealType from '../../models/meal-type.enum';
import ProfileService from '../../services/profile.service';
import DayService from '../../services/day.service';
import { TrackingEntriesService } from '../../services/tracking-entries.service';

@Component({
  selector: 'app-dashboard',
  imports: [ProgressBarComponent, Tag, MealCardComponent],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  selectedDay: Date = new Date(Date.now());

  constructor(
    private router: Router,
    protected profileService: ProfileService,
    protected dayService: DayService,
    protected trackingEntriesService: TrackingEntriesService,
  ) {}

  ngOnInit(): void {
    this.profileService.fetchProfile();
    this.dayService.fetchDay(this.selectedDay);
    this.trackingEntriesService.fetchByDay(this.selectedDay);
  }

  onAddFood(mealType: MealType) {
    const today = new Date(Date.now());
    const dayFormatted = today.toISOString().split('T')[0];

    this.router.navigate(['/track'], {
      queryParams: {
        day: dayFormatted,
        mealType: mealType,
      },
    });
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
}
