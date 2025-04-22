package dev.rumetshofer.nutric.use_cases.dto;

import dev.rumetshofer.nutric.use_cases.enums.YazioServing;
import dev.rumetshofer.nutric.use_cases.enums.Unit;
import lombok.Builder;

@Builder(toBuilder = true)
public record ProductData (
        String name,
        String producer,
        YazioServing yazioServing,
        int servingQuantity,
        int amount,
        Unit baseUnit,
        double energyPerBaseUnit,
        double carbsPerBaseUnit,
        double fatPerBaseUnit,
        double proteinPerBaseUnit,
        String externalUuid
) {
}
