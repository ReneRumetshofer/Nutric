package dev.rumetshofer.nutric.use_cases.dto;

import lombok.Builder;

@Builder
public record LastTrackedFoodData(
        LastTrackedAmountData lastTrackedAmountData,
        ProductData productData
) {
}
