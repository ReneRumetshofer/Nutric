import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { Panel } from 'primeng/panel';
import { Divider } from 'primeng/divider';
import { TrackingEntry } from '../../../data/models/tracking-entry.model';
import { NutritionValuesComponent } from '../../shared/nutrition-values/nutrition-values.component';
import { mapUnitToGerman } from '../../../data/models/product.model';
import { TrackingEntryComponent } from './tracking-entry/tracking-entry.component';
import { TrackDialogComponent } from '../../track-food-screen/track-dialog/track-dialog.component';
import { InitialAmountSelection } from '../../../data/initial-amount-selection.model';
import { TrackFoodEvent } from '../../../data/events/track-food-event';
import { UpdateTrackingEntryEvent } from '../../../data/events/update-tracking-entry-event';

@Component({
  selector: 'app-meal-card',
  imports: [
    Button,
    Panel,
    Divider,
    NutritionValuesComponent,
    TrackingEntryComponent,
    TrackDialogComponent,
  ],
  templateUrl: './meal-card.component.html',
  standalone: true,
  styleUrl: './meal-card.component.scss',
})
export class MealCardComponent {
  @Input({ required: true }) mealName: string = '';
  @Input() trackingEntries: TrackingEntry[] = [];
  @Output() onAdd: EventEmitter<void> = new EventEmitter<void>();
  @Output() onDeleteEntry: EventEmitter<TrackingEntry> =
    new EventEmitter<TrackingEntry>();
  @Output() onUpdateEntry: EventEmitter<UpdateTrackingEntryEvent> =
    new EventEmitter<UpdateTrackingEntryEvent>();

  collapsed: boolean = true;

  selectedEntry: TrackingEntry | null = null;
  editDialogVisible: boolean = false;
  initialAmountSelection: InitialAmountSelection | null = null;

  onEntryClick(trackingEntry: TrackingEntry): void {
    this.selectedEntry = trackingEntry;
    this.editDialogVisible = true;
    this.initialAmountSelection = {
      amount: trackingEntry.trackedInBaseUnit
        ? trackingEntry.amount
        : trackingEntry.amount /
          (trackingEntry.product.serving?.baseUnitAmount ?? 1),
      baseUnitSelected: trackingEntry.trackedInBaseUnit,
    };
  }

  onDelete(): void {
    if (!this.selectedEntry) {
      return;
    }
    this.onDeleteEntry.emit(this.selectedEntry);
  }

  onUpdate(trackFoodEvent: TrackFoodEvent): void {
    const updateTrackingEntryEvent = {
      amount: trackFoodEvent.amount,
      trackingUnitSelection: trackFoodEvent.trackingUnitSelection,
      originalTrackingEntry: this.selectedEntry,
    } as UpdateTrackingEntryEvent;

    this.onUpdateEntry.emit(updateTrackingEntryEvent);
  }

  get totalUsedCalories(): number {
    if (!this.trackingEntries) {
      return 0;
    }

    return this.trackingEntries.reduce(
      (acc, entry) => acc + entry.amount * entry.nutritionPerBaseUnit.energy,
      0,
    );
  }

  get totalUsedCarbs(): number {
    if (!this.trackingEntries) {
      return 0;
    }

    return this.trackingEntries.reduce(
      (acc, entry) => acc + entry.amount * entry.nutritionPerBaseUnit.carbs,
      0,
    );
  }

  get totalUsedProtein(): number {
    if (!this.trackingEntries) {
      return 0;
    }

    return this.trackingEntries.reduce(
      (acc, entry) => acc + entry.amount * entry.nutritionPerBaseUnit.protein,
      0,
    );
  }

  get totalUsedFat(): number {
    if (!this.trackingEntries) {
      return 0;
    }

    return this.trackingEntries.reduce(
      (acc, entry) => acc + entry.amount * entry.nutritionPerBaseUnit.fat,
      0,
    );
  }

  protected readonly mapUnitToGerman = mapUnitToGerman;
}
