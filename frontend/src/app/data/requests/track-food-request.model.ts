import { Product } from '../models/product.model';

export interface TrackFoodRequest {
  product: Product;
  mealType: string;
  baseUnit: string;
  amountInBaseUnit: number;
  trackedInBaseUnit: boolean;
}
