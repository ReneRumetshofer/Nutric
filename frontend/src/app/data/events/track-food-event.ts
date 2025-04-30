import { Product } from '../models/product.model';
import { TrackingUnitSelection } from '../tracking-unit-selection.model';

export interface TrackFoodEvent {
  amount: number;
  trackingUnitSelection: TrackingUnitSelection;
  product: Product;
}
