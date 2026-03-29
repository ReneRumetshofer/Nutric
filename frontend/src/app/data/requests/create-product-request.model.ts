import { ServingUnit, Unit } from '../models/product.model';

export interface CreateProductRequest {
  name: string;
  producer: string | null;
  baseUnit: Unit;
  caloriesPerHundred: number;
  proteinPerHundred: number;
  carbsPerHundred: number;
  fatPerHundred: number;
  servingUnit: ServingUnit | null;
  servingSize: number | null;
}
