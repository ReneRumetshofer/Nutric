import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { Panel } from 'primeng/panel';
import { Divider } from 'primeng/divider';
import { TrackingEntry } from '../../../models/tracking-entry.model';

@Component({
  selector: 'app-meal-card',
  imports: [Button, Panel, Divider],
  templateUrl: './meal-card.component.html',
  standalone: true,
  styleUrl: './meal-card.component.scss',
})
export class MealCardComponent {
  @Input({ required: true }) mealName: string = '';
  @Input() trackingEntries: TrackingEntry[] = [];
  @Output() onAdd: EventEmitter<void> = new EventEmitter<void>();

  get totalUsedCalories(): number {
    if (!this.trackingEntries) {
      return 0;
    }

    return this.trackingEntries.reduce(
      (acc, entry) => acc + entry.amount * entry.nutritionPerBaseUnit.energy,
      0,
    );
  }
}
