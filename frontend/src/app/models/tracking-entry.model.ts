import MealType from './meal-type.enum';
import { Nutrition, Product, Unit } from './product.model';

export interface TrackingEntry {
  uuid: string;
  mealType: MealType;
  product: Product;
  amount: number;
  baseUnit: Unit;
  nutritionPerBaseUnit: Nutrition;
  trackedInBaseUnit: boolean;
}
