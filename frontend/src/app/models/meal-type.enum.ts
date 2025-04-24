enum MealType {
  BREAKFAST = 'BREAKFAST',
  LUNCH = 'LUNCH',
  DINNER = 'DINNER',
  SNACK = 'SNACK',
}

export const MealTypeMapping: Record<MealType, string> = {
  [MealType.BREAKFAST]: 'Frühstück',
  [MealType.LUNCH]: 'Mittagessen',
  [MealType.DINNER]: 'Abendessen',
  [MealType.SNACK]: 'Snacks',
};

export function mapMealTypeToGerman(value: MealType): string {
  return MealTypeMapping[value];
}

export default MealType;
