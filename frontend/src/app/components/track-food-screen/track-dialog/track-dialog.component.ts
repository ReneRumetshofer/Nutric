import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../models/product.model';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { DataValueComponent } from '../../shared/data-value/data-value.component';
import { Panel } from 'primeng/panel';
import { PerHundredPanelComponent } from './per-hundred-panel/per-hundred-panel.component';
import { TrackPanelComponent } from './track-panel/track-panel.component';

@Component({
  selector: 'app-track-dialog',
  imports: [
    Dialog,
    Button,
    DataValueComponent,
    Panel,
    PerHundredPanelComponent,
    TrackPanelComponent,
  ],
  templateUrl: './track-dialog.component.html',
  standalone: true,
  styleUrl: './track-dialog.component.scss',
})
export class TrackDialogComponent {
  @Input({ required: true }) product: Product | null = null;
  @Input() visible: boolean = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  close(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  protected readonly Math = Math;
}
