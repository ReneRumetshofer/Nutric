import {
  mapServingUnitToGerman,
  mapUnitToGerman,
  Serving,
  Unit,
} from '../../../../models/product.model';

export class TrackingUnitSelection {
  isBaseUnit: boolean;
  serving: Serving | null;
  baseUnit: Unit;

  constructor(isBaseUnit: boolean, serving: Serving | null, baseUnit: Unit) {
    this.isBaseUnit = isBaseUnit;
    this.serving = serving;
    this.baseUnit = baseUnit;
  }

  get displayValue(): string {
    if (!this.serving) {
      return this.baseUnit;
    }
    return `${mapServingUnitToGerman(this.serving.unit)} (${this.serving.baseUnitAmount} ${mapUnitToGerman(this.baseUnit)})`;
  }
}
