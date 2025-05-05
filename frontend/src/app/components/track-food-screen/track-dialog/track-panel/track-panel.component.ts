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
} from '../../../../data/models/product.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NutritionValuesComponent } from '../../../shared/nutrition-values/nutrition-values.component';
import { InputNumber } from 'primeng/inputnumber';
import { Select, SelectChangeEvent } from 'primeng/select';
import { FloatLabel } from 'primeng/floatlabel';
import { TrackingUnitSelection } from '../../../../data/tracking-unit-selection.model';
import { Subscription } from 'rxjs';
import { InputText } from 'primeng/inputtext';
import { InitialAmountSelection } from '../../../../data/initial-amount-selection.model';

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
export class TrackPanelComponent implements OnInit, OnDestroy, OnChanges {
  @Input() product!: Product;
  @Input() initialAmountSelection: InitialAmountSelection | null = null;
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

      this.prefillElements();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['initialAmountSelection'] &&
      changes['initialAmountSelection'].currentValue
    ) {
      this.prefillElements();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  onTrackedUnitChange(event: SelectChangeEvent): void {
    const trackingUnit = event.value as TrackingUnitSelection;
    this.amountControl.setValue(trackingUnit.isBaseUnit ? 100 : 1);
  }

  constructTrackingUnits(): void {
    this.trackingSelectionOptions = [];

    if (this.product.serving) {
      this.trackingSelectionOptions.push(
        new TrackingUnitSelection(
          false,
          this.product.serving,
          this.product.baseUnit,
        ),
      );
    }

    this.trackingSelectionOptions.push(
      new TrackingUnitSelection(true, null, this.product.baseUnit),
    );
  }

  prefillElements(): void {
    const defaultSelection = this.trackingSelectionOptions[0];

    if (this.initialAmountSelection) {
      this.trackingUnitControl.setValue(
        this.trackingSelectionOptions.find(
          (option) =>
            option.isBaseUnit === this.initialAmountSelection!.baseUnitSelected,
        ) ?? defaultSelection,
      );
      this.amountControl.setValue(
        parseFloat(this.initialAmountSelection.amount.toFixed(3)),
      );
      return;
    }

    this.trackingUnitControl.setValue(defaultSelection);
    this.amountControl.setValue(defaultSelection.isBaseUnit ? 100 : 1);
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
