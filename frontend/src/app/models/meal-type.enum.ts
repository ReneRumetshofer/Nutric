enum MealType {
  BREAKFAST = 'BREAKFAST',
  LUNCH = 'LUNCH',
  DINNER = 'DINNER',
  SNACKS = 'SNACKS',
}

export const MealTypeMapping: Record<MealType, string> = {
  [MealType.BREAKFAST]: 'Frühstück',
  [MealType.LUNCH]: 'Mittagessen',
  [MealType.DINNER]: 'Abendessen',
  [MealType.SNACKS]: 'Snacks',
};

export function mapMealTypeToGerman(value: MealType): string {
  return MealTypeMapping[value];
}

export default MealType;
