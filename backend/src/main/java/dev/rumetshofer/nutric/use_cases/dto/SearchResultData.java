package dev.rumetshofer.nutric.use_cases.dto;

import lombok.Builder;

import java.util.Optional;

@Builder
public record SearchResultData(
        Optional<LastTrackedData> lastTrackedData,
        ProductData productData
) {
}
