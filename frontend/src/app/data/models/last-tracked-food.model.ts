import { LastTrackedAmountData } from './last-tracked-amount-data.model';
import { Product } from './product.model';

export interface LastTrackedFood {
  lastTrackedAmountData: LastTrackedAmountData | null;
  productData: Product;
}
