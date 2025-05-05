import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  mapServingUnitToGerman,
  mapUnitToGerman,
} from '../../../../data/models/product.model';
import { TrackingEntry } from '../../../../data/models/tracking-entry.model';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-tracking-entry',
  imports: [Ripple],
  templateUrl: './tracking-entry.component.html',
  styleUrl: './tracking-entry.component.scss',
})
export class TrackingEntryComponent {
  @Input({ required: true }) entry!: TrackingEntry;
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  get calculatedAmount(): number {
    if (this.entry.trackedInBaseUnit || !this.entry.product.serving) {
      return this.entry.amount;
    }

    return parseFloat(
      (this.entry.amount / this.entry.product.serving.baseUnitAmount).toFixed(
        3,
      ),
    );
  }

  get trackedUnit(): string {
    if (this.entry.trackedInBaseUnit || !this.entry.product.serving) {
      return mapUnitToGerman(this.entry.baseUnit);
    }

    return mapServingUnitToGerman(this.entry.product.serving.unit) ?? '';
  }

  protected readonly mapUnitToGerman = mapUnitToGerman;
}
