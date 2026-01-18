import { Product } from './product.model';

export interface SearchResult {
  lastTrackedAmountData: LastTrackedAmountData | null;
  productData: Product;
}

export interface LastTrackedAmountData {
  amount: number;
  trackedInBaseUnit: boolean;
}
