package dev.rumetshofer.nutric.use_cases.dto;

import lombok.Builder;

import java.time.LocalDate;
import java.util.UUID;

@Builder(toBuilder = true)
public record DayData (
        Long id,
        LocalDate day,
        UUID userUuid,
        Integer calorieGoal,
        Integer carbLimitGrams,
        Integer proteinLimitGrams,
        Integer fatLimitGrams
) {
}
