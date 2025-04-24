import { Product } from './product.model';

export interface TrackFoodRequest {
  product: Product;
  mealType: string;
  baseUnit: string;
  amount: number;
}
