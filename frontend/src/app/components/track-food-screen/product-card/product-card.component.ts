import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  mapServingUnitToGerman,
  mapUnitToGerman,
} from '../../../data/models/product.model';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { SearchResult } from '../../../data/models/search-result.model';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-product-card',
  imports: [Card, Button, Tag],
  templateUrl: './product-card.component.html',
  standalone: true,
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() searchResult!: SearchResult;
  @Output() onAdd: EventEmitter<void> = new EventEmitter<void>();

  get computedAmountFormatted(): number {
    let computedAmount = 0;
    if (this.searchResult.lastTrackedData) {
      const statedAmount = this.searchResult.lastTrackedData.amount;
      computedAmount = this.searchResult.lastTrackedData.trackedInBaseUnit
        ? statedAmount
        : statedAmount /
          (this.searchResult.productData.serving?.baseUnitAmount ?? 1);
    } else {
      computedAmount = this.searchResult.productData.serving ? 1 : 100;
    }

    return parseFloat(computedAmount.toFixed(3));
  }

  get computedUnit(): string {
    if (this.searchResult.lastTrackedData) {
      return !this.searchResult.lastTrackedData.trackedInBaseUnit &&
        this.searchResult.productData.serving
        ? mapServingUnitToGerman(this.searchResult.productData.serving.unit)
        : mapUnitToGerman(this.searchResult.productData.baseUnit);
    }

    return this.searchResult.productData.serving
      ? mapServingUnitToGerman(this.searchResult.productData.serving.unit)
      : mapUnitToGerman(this.searchResult.productData.baseUnit);
  }

  get shouldShowServingSize(): boolean {
    return (
      this.searchResult.lastTrackedData == null &&
      this.searchResult.productData.serving != null
    );
  }

  get computedCalories(): number {
    let computedBaseUnitAmount = 0;
    if (this.searchResult.lastTrackedData) {
      const statedAmount = this.searchResult.lastTrackedData.amount;
      computedBaseUnitAmount = this.searchResult.lastTrackedData
        .trackedInBaseUnit
        ? statedAmount
        : (this.searchResult.productData.serving?.baseUnitAmount ?? 1);
    } else {
      computedBaseUnitAmount = this.searchResult.productData.serving
        ? this.searchResult.productData.serving.baseUnitAmount
        : 100;
    }

    return Math.round(
      computedBaseUnitAmount *
        this.searchResult.productData.nutritionPerBaseUnit.energy,
    );
  }

  protected readonly mapUnitToGerman = mapUnitToGerman;
}
