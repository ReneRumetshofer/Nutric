import { Component, Input } from '@angular/core';
import { Product } from '../../../../models/product.model';
import { DataValueComponent } from '../../../shared/data-value/data-value.component';

@Component({
  selector: 'app-nutrition-values',
  imports: [DataValueComponent],
  templateUrl: './nutrition-values.component.html',
  standalone: true,
  styleUrl: './nutrition-values.component.scss',
})
export class NutritionValuesComponent {
  @Input() product!: Product;
  @Input() amount: number = 1;

  protected readonly Math = Math;
}
