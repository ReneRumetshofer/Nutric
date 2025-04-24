package dev.rumetshofer.nutric.use_cases.dto;

import dev.rumetshofer.nutric.use_cases.enums.ServingUnit;
import lombok.Builder;

@Builder(toBuilder = true)
public record Serving (
        ServingUnit unit,
        double baseUnitAmount
) {
}
