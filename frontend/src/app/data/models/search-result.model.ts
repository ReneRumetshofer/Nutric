import { Product } from './product.model';
import { LastTrackedAmountData } from './last-tracked-amount-data.model';

export interface SearchResult {
  lastTrackedAmountData: LastTrackedAmountData | null;
  productData: Product;
}
