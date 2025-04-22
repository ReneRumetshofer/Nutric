export enum YazioServing {
  GLASS = 'Glas',
  PACKAGE = 'Packung',
  MILLILITERS = 'ml',
  GRAMS = 'g',
  PORTION = 'Portion',
  PORTION_LARGE = 'große Portion',
  PIECE = 'Stück',
  SLICE = 'Scheibe',
  CAN = 'Dose',
  TABLESPOON = 'Esslöffel',
  TEASPOON = 'Teelöffel',
  SANDWICH = 'Sandwich',
  MUG = 'Tasse',
  MUG_REGULAR = 'Tasse',
  ROLL = 'Brötchen',
  CANDY = 'Bonbon',
  EACH = 'jeweils',
  BOTTLE = 'Flasche',
  BEAKER = 'Becher',
  CUP = 'Becher',
  PATTY = 'Pattie',
  PLATE = 'Teller',
  PLATE_REGULAR = 'Teller',
  SCOOP = 'Kugel',
  ICE_LOLLY = 'Eis am Stiel',
}

export enum Unit {
  GRAMS = 'g',
  KILOGRAMS = 'kg',
  MILLILITERS = 'ml',
  LITERS = 'l',
}

export interface Product {
  name: string;
  producer: string;
  yazioServing: YazioServing;
  servingQuantity: number;
  amount: number;
  baseUnit: Unit;
  energyPerBaseUnit: number;
  carbsPerBaseUnit: number;
  fatPerBaseUnit: number;
  proteinPerBaseUnit: number;
  externalUuid: string;
}
