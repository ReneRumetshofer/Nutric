package dev.rumetshofer.nutric.use_cases.dto;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record LastTrackedData(
        BigDecimal amount,
        boolean trackedInBaseUnit
) {
}
