import { Component, EventEmitter, Input, Output } from '@angular/core';
import { mapUnitToGerman } from '../../../../models/product.model';
import { TrackingEntry } from '../../../../models/tracking-entry.model';
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

  protected readonly mapUnitToGerman = mapUnitToGerman;
}
