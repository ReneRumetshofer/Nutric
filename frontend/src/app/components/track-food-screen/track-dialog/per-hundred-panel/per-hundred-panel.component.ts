import { Component, Input } from '@angular/core';
import { mapUnitToGerman, Product } from '../../../../models/product.model';
import { DataValueComponent } from '../../../shared/data-value/data-value.component';
import { Panel } from 'primeng/panel';
import { NutritionValuesComponent } from '../nutrition-values/nutrition-values.component';

@Component({
  selector: 'app-per-hundred-panel',
  imports: [Panel, NutritionValuesComponent],
  templateUrl: './per-hundred-panel.component.html',
  standalone: true,
  styleUrl: './per-hundred-panel.component.scss',
})
export class PerHundredPanelComponent {
  @Input() product!: Product;
  @Input() amount: number = 1;
  protected readonly mapUnitToGerman = mapUnitToGerman;
}
