package dev.rumetshofer.nutric.controllers.requests;

import dev.rumetshofer.nutric.use_cases.dto.ProductData;
import dev.rumetshofer.nutric.use_cases.enums.MealType;
import dev.rumetshofer.nutric.use_cases.enums.Unit;

import java.math.BigDecimal;

public record TrackFoodRestRequest (
        ProductData product,
        MealType mealType,
        Unit baseUnit,
        BigDecimal amount,
        boolean trackedInBaseUnit
) {
}
