package dev.rumetshofer.nutric.use_cases.dto.in;

import java.math.BigDecimal;

public record UpdateTrackingEntryRequest(
        BigDecimal amount,
        boolean trackedInBaseUnit
) {
}
