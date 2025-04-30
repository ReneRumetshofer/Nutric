package dev.rumetshofer.nutric.use_cases.dto;

import dev.rumetshofer.nutric.use_cases.enums.MealType;
import dev.rumetshofer.nutric.use_cases.enums.Unit;
import lombok.Builder;

import java.math.BigDecimal;
import java.util.UUID;

@Builder(toBuilder = true)
public record TrackingEntryData (
        UUID uuid,
        MealType mealType,
        ProductData product,
        BigDecimal amount,
        Unit baseUnit,
        Nutrition nutritionPerBaseUnit,
        boolean trackedInBaseUnit
) {
}
