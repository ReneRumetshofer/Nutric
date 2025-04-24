package dev.rumetshofer.nutric.use_cases.dto;

import dev.rumetshofer.nutric.use_cases.enums.Unit;
import lombok.Builder;

import java.util.Optional;
import java.util.UUID;

@Builder(toBuilder = true)
public record ProductData (
        String name,
        String producer,
        Optional<Serving> serving,
        Unit baseUnit,
        Nutrition nutritionPerBaseUnit,
        UUID externalUuid,
        Optional<UUID> uuid,
        boolean isCustomized,
        boolean isExternal
) {
}
