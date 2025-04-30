export enum ServingUnit {
  PACKAGE = 'PACKAGE',
  MILLILITERS = 'MILLILITERS',
  GRAMS = 'GRAMS',
  PORTION = 'PORTION',
  GLASS = 'GLASS',
  PIECE = 'PIECE',
  TABLESPOON = 'TABLESPOON',
  TEASPOON = 'TEASPOON',
  CUP = 'CUP',
  BOTTLE = 'BOTTLE',
}

export enum Unit {
  GRAMS = 'GRAMS',
  KILOGRAMS = 'KILOGRAMS',
  MILLILITERS = 'MILLILITERS',
  LITERS = 'LITERS',
}

export const ServingUnitMapping: Record<ServingUnit, string> = {
  [ServingUnit.PACKAGE]: 'Packung',
  [ServingUnit.MILLILITERS]: 'ml',
  [ServingUnit.GRAMS]: 'g',
  [ServingUnit.PORTION]: 'Portion',
  [ServingUnit.GLASS]: 'Glas',
  [ServingUnit.PIECE]: 'Stück',
  [ServingUnit.TABLESPOON]: 'Esslöffel',
  [ServingUnit.TEASPOON]: 'Teelöffel',
  [ServingUnit.CUP]: 'Becher',
  [ServingUnit.BOTTLE]: 'Flasche',
};

export const UnitMapping: Record<Unit, string> = {
  [Unit.GRAMS]: 'g',
  [Unit.KILOGRAMS]: 'kg',
  [Unit.MILLILITERS]: 'ml',
  [Unit.LITERS]: 'l',
};

export function mapServingUnitToGerman(value: ServingUnit): string {
  return ServingUnitMapping[value];
}

export function mapUnitToGerman(value: Unit): string {
  return UnitMapping[value];
}

export interface Serving {
  unit: ServingUnit;
  baseUnitAmount: number;
}

export interface Nutrition {
  energy: number;
  carbs: number;
  fat: number;
  protein: number;
}

export interface Product {
  name: string;
  producer: string;
  serving: Serving | null;
  baseUnit: Unit;
  nutritionPerBaseUnit: Nutrition;
  externalUuid: string;
  uuid: string | null;
  isCustomized: boolean;
  isExternal: boolean;
}
