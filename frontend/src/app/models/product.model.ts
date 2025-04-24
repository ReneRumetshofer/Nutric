export enum ServingUnit {
  PACKAGE = 'Packung',
  MILLILITERS = 'ml',
  GRAMS = 'g',
  PORTION = 'Portion',
  GLASS = 'Glas',
  PIECE = 'Stück',
  TABLESPOON = 'Esslöffel',
  TEASPOON = 'Teelöffel',
  CUP = 'Becher',
  BOTTLE = 'Flasche',
}

export enum Unit {
  GRAMS = 'g',
  KILOGRAMS = 'kg',
  MILLILITERS = 'ml',
  LITERS = 'l',
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
