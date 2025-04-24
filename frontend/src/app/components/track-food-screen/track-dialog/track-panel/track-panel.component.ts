import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Panel } from 'primeng/panel';
import { Product, Serving } from '../../../../models/product.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NutritionValuesComponent } from '../nutrition-values/nutrition-values.component';
import { InputNumber } from 'primeng/inputnumber';
import { Select } from 'primeng/select';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'app-track-panel',
  imports: [
    Panel,
    NutritionValuesComponent,
    InputNumber,
    ReactiveFormsModule,
    Select,
    FloatLabel,
  ],
  templateUrl: './track-panel.component.html',
  standalone: true,
  styleUrl: './track-panel.component.scss',
})
export class TrackPanelComponent implements OnChanges, OnInit {
  @Input() product!: Product;

  amountControl: FormControl<number | null> = new FormControl<number>(100);
  trackingUnitControl: FormControl<TrackingUnitSelection | null> =
    new FormControl<TrackingUnitSelection | null>(null);
  amountForm: FormGroup = new FormGroup({
    amount: this.amountControl,
    trackingUnit: this.trackingUnitControl,
  });

  trackingSelectionOptions: TrackingUnitSelection[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.constructTrackingUnits();

      this.trackingUnitControl.setValue(this.trackingSelectionOptions[0]);
    }
  }

  ngOnInit(): void {
    this.trackingUnitControl.valueChanges.subscribe((value) => {
      if (!value) {
        return;
      }

      this.amountControl.setValue(!value.serving ? 100 : 1);
    });
  }

  constructTrackingUnits(): void {
    this.trackingSelectionOptions = [
      new TrackingUnitSelection(null, this.product.baseUnit),
    ];

    if (this.product.serving) {
      this.trackingSelectionOptions.push(
        new TrackingUnitSelection(this.product.serving, this.product.baseUnit),
      );
    }
  }

  get calculatedAmount(): number {
    if (!this.trackingUnitControl.value) {
      return 0;
    }

    if (!this.trackingUnitControl.value.serving || !this.product.serving) {
      return this.amountControl.value ?? 0;
    }

    return (
      (this.amountControl.value ?? 0) * this.product.serving.baseUnitAmount
    );
  }
}

export class TrackingUnitSelection {
  serving: Serving | null;
  baseUnit: string;

  constructor(serving: Serving | null, baseUnit: string) {
    this.serving = serving;
    this.baseUnit = baseUnit;
  }

  get displayValue(): string {
    if (!this.serving) {
      return this.baseUnit;
    }
    return `${this.serving.unit} (${this.serving.baseUnitAmount} ${this.baseUnit})`;
  }
}
