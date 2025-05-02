package dev.rumetshofer.nutric.use_cases.dto.in;

import lombok.NonNull;

import java.math.BigDecimal;

public record UpdateProfileRequest (
        @NonNull BigDecimal weight,
        int calorieGoal,
        int carbLimitGrams,
        int proteinLimitGrams,
        int fatLimitGrams
) {
}
