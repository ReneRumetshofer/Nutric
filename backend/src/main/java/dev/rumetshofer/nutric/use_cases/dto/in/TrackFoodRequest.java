package dev.rumetshofer.nutric.use_cases.dto.in;

import dev.rumetshofer.nutric.use_cases.dto.ProductData;
import dev.rumetshofer.nutric.use_cases.enums.MealType;
import dev.rumetshofer.nutric.use_cases.enums.Unit;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Builder(toBuilder = true)
public record TrackFoodRequest(
        ProductData product,
        LocalDate day,
        MealType mealType,
        BigDecimal amount,
        Unit baseUnit,
        UUID userUuid
) {
}
