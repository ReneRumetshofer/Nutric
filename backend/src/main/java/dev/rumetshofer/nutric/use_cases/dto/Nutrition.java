package dev.rumetshofer.nutric.use_cases.dto;

import lombok.Builder;

@Builder(toBuilder = true)
public record Nutrition(
        double energy,
        double carbs,
        double fat,
        double protein
) {
}
