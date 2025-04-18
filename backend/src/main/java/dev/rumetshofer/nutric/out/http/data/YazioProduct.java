package dev.rumetshofer.nutric.out.http.data;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

import java.util.List;

@Builder(toBuilder = true)
public record YazioProduct (
        int score,
        String name,
        String product_id,
        String serving,
        int serving_quantity,
        int amount,
        String base_unit,
        String producer,
        boolean is_verified,
        Nutrients nutrients,
        List<String> countries,
        String language
) {
    @Builder(toBuilder = true)
    public record Nutrients(
            @JsonProperty("energy.energy")
            double energy,
            @JsonProperty("nutrient.carb")
            double carb,
            @JsonProperty("nutrient.fat")
            double fat,
            @JsonProperty("nutrient.protein")
            double protein
    ) {
    }
}