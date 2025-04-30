import { Product } from '../models/product.model';

export interface TrackFoodRequest {
  product: Product;
  mealType: string;
  baseUnit: string;
  amount: number;
  trackedInBaseUnit: boolean;
}
