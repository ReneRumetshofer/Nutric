import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { Panel } from 'primeng/panel';
import { Divider } from 'primeng/divider';
import { TrackingEntry } from '../../../models/tracking-entry.model';
import { Ripple } from 'primeng/ripple';
import { Card } from 'primeng/card';
import { PerHundredPanelComponent } from '../../track-food-screen/track-dialog/per-hundred-panel/per-hundred-panel.component';
import { NutritionValuesComponent } from '../../shared/nutrition-values/nutrition-values.component';
import { mapUnitToGerman, Product } from '../../../models/product.model';
import { TrackingEntryComponent } from './tracking-entry/tracking-entry.component';
import { TrackDialogComponent } from '../../track-food-screen/track-dialog/track-dialog.component';

@Component({
  selector: 'app-meal-card',
  imports: [
    Button,
    Panel,
    Divider,
    Ripple,
    Card,
    PerHundredPanelComponent,
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

  collapsed: boolean = true;

  editDialogVisible: boolean = false;
  selectedProduct: Product | null = null;

  onEntryClick(trackingEntry: TrackingEntry): void {
    this.selectedProduct = trackingEntry.product;
    this.editDialogVisible = true;
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
