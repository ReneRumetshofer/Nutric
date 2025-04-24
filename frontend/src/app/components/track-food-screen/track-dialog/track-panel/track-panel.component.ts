import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Panel } from 'primeng/panel';
import {
  mapServingUnitToGerman,
  mapUnitToGerman,
  Product,
  Serving,
} from '../../../../models/product.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NutritionValuesComponent } from '../nutrition-values/nutrition-values.component';
import { InputNumber } from 'primeng/inputnumber';
import { Select } from 'primeng/select';
import { FloatLabel } from 'primeng/floatlabel';
import { TrackingUnitSelection } from '../models/tracking-unit-selection.model';
import { Subscription } from 'rxjs';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-track-panel',
  imports: [
    Panel,
    NutritionValuesComponent,
    ReactiveFormsModule,
    Select,
    FloatLabel,
    InputText,
  ],
  templateUrl: './track-panel.component.html',
  standalone: true,
  styleUrl: './track-panel.component.scss',
})
export class TrackPanelComponent implements OnInit, OnDestroy {
  @Input() product!: Product;
  @Output() amountChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() trackingUnitChange: EventEmitter<TrackingUnitSelection> =
    new EventEmitter<TrackingUnitSelection>();

  amountControl: FormControl<number | null> = new FormControl<number>(100);
  trackingUnitControl: FormControl<TrackingUnitSelection | null> =
    new FormControl<TrackingUnitSelection | null>(null);
  amountForm: FormGroup = new FormGroup({
    amount: this.amountControl,
    trackingUnit: this.trackingUnitControl,
  });

  trackingSelectionOptions: TrackingUnitSelection[] = [];

  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.subscriptions.push(
      this.trackingUnitControl.valueChanges.subscribe((trackingUnit) => {
        if (!trackingUnit) {
          return;
        }

        this.amountControl.setValue(trackingUnit.isBaseUnit ? 100 : 1);
        this.trackingUnitChange.emit(trackingUnit);
      }),
      this.amountControl.valueChanges.subscribe((amount) => {
        if (!amount) {
          return;
        }
        this.amountChange.emit(amount);
      }),
    );

    if (this.product) {
      this.constructTrackingUnits();

      this.trackingUnitControl.setValue(this.trackingSelectionOptions[0]);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  constructTrackingUnits(): void {
    this.trackingSelectionOptions = [
      new TrackingUnitSelection(true, null, this.product.baseUnit),
    ];

    if (this.product.serving) {
      this.trackingSelectionOptions.push(
        new TrackingUnitSelection(
          false,
          this.product.serving,
          this.product.baseUnit,
        ),
      );
    }
  }

  validateNumberInput(event: KeyboardEvent) {
    const input = event.key;
    const inputElement = event.target as HTMLInputElement;
    const currentValue = inputElement.value;

    const isCtrlOrCmd = event.ctrlKey || event.metaKey;
    const allowedKeys = [
      'Backspace',
      'ArrowLeft',
      'ArrowRight',
      'Delete',
      'Tab',
    ];

    const isDigit = /^[0-9]$/.test(input);
    const isDecimal = input === '.';

    // Allow control keys
    if (allowedKeys.includes(input)) return;

    // Allow Ctrl/Cmd + A, C, V, X
    if (isCtrlOrCmd && ['a', 'c', 'v', 'x'].includes(input.toLowerCase()))
      return;

    // Allow only one decimal
    if (
      isDecimal &&
      (currentValue.includes('.') || currentValue.includes(','))
    ) {
      event.preventDefault();
      return;
    }

    // Block anything that is not digit or decimal
    if (!isDigit && !isDecimal) {
      event.preventDefault();
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
