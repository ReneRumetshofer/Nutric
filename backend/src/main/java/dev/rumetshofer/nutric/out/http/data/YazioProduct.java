package dev.rumetshofer.nutric.out.http.data;

import lombok.Builder;

import java.util.List;

@Builder(toBuilder = true)
public record YazioProduct(
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
            double energy_energy,
            double nutrient_carb,
            double nutrient_fat,
            double nutrient_protein
    ) {
    }
}