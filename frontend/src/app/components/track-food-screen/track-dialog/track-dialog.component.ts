import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../models/product.model';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { PerHundredPanelComponent } from './per-hundred-panel/per-hundred-panel.component';
import { TrackPanelComponent } from './track-panel/track-panel.component';
import { TrackingUnitSelection } from './models/tracking-unit-selection.model';
import { TrackFoodEvent } from './models/track-food-event';

@Component({
  selector: 'app-track-dialog',
  imports: [Dialog, Button, PerHundredPanelComponent, TrackPanelComponent],
  templateUrl: './track-dialog.component.html',
  standalone: true,
  styleUrl: './track-dialog.component.scss',
})
export class TrackDialogComponent {
  @Input({ required: true }) product: Product | null = null;
  @Input() visible: boolean = false;
  @Input() confirmButtonCaption: string = 'Tracken';
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onTrackFood: EventEmitter<TrackFoodEvent> =
    new EventEmitter<TrackFoodEvent>();

  amount?: number;
  trackingUnitSelection?: TrackingUnitSelection;

  close(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  onTrackButtonClick(): void {
    if (!this.amount || !this.trackingUnitSelection || !this.product) {
      return;
    }

    this.onTrackFood.emit({
      amount: this.amount,
      trackingUnitSelection: this.trackingUnitSelection,
      product: this.product,
    });
    this.close();
  }
}
