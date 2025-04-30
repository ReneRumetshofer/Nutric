import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  mapServingUnitToGerman,
  mapUnitToGerman,
  Product,
} from '../../../data/models/product.model';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-product-card',
  imports: [Card, Button],
  templateUrl: './product-card.component.html',
  standalone: true,
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() onAdd: EventEmitter<void> = new EventEmitter<void>();

  protected readonly Math = Math;
  protected readonly mapServingUnitToGerman = mapServingUnitToGerman;
  protected readonly mapUnitToGerman = mapUnitToGerman;
}
