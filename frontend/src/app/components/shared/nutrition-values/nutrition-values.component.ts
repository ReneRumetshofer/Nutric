import { Component, Input } from '@angular/core';
import { DataValueComponent } from '../data-value/data-value.component';

@Component({
  selector: 'app-nutrition-values',
  imports: [DataValueComponent],
  templateUrl: './nutrition-values.component.html',
  standalone: true,
  styleUrl: './nutrition-values.component.scss',
})
export class NutritionValuesComponent {
  @Input() calories: number = 0;
  @Input() carbs: number = 0;
  @Input() protein: number = 0;
  @Input() fat: number = 0;

  protected readonly Math = Math;
}
