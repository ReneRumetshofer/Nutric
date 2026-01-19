package dev.rumetshofer.nutric.use_cases.dto;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record LastTrackedAmountData(
        BigDecimal amountInBaseUnit,
        boolean trackedInBaseUnit
) {
}
