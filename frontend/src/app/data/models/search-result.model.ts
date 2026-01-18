import { Product } from './product.model';

export interface SearchResult {
  lastTrackedData: LastTrackedData | null;
  productData: Product;
}

export interface LastTrackedData {
  amount: number;
  trackedInBaseUnit: boolean;
}
