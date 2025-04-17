package dev.rumetshofer.nutric.use_cases.dto;

import lombok.Builder;

import java.math.BigDecimal;
import java.util.UUID;

@Builder(toBuilder = true)
public record ProfileData(
        UUID userUuid,
        String firstName,
        String lastName,
        String email,
        Integer calorieGoal,
        BigDecimal weight,
        Integer carbLimitGrams,
        Integer proteinLimitGrams,
        Integer fatLimitGrams
) {
}
