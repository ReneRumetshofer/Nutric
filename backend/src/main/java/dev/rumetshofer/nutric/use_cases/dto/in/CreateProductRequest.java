package dev.rumetshofer.nutric.use_cases.dto.in;

import dev.rumetshofer.nutric.use_cases.enums.ServingUnit;
import dev.rumetshofer.nutric.use_cases.enums.Unit;
import lombok.NonNull;

import java.math.BigDecimal;

public record CreateProductRequest(
        @NonNull String name,
        String producer,
        @NonNull Unit baseUnit,
        @NonNull BigDecimal caloriesPerHundred,
        @NonNull BigDecimal proteinPerHundred,
        @NonNull BigDecimal carbsPerHundred,
        @NonNull BigDecimal fatPerHundred,
        ServingUnit servingUnit,
        BigDecimal servingSize
) {
}
