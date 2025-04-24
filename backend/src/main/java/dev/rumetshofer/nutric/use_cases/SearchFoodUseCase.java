package dev.rumetshofer.nutric.use_cases;

import dev.rumetshofer.nutric.out.http.YazioSearchService;
import dev.rumetshofer.nutric.out.http.data.YazioProduct;
import dev.rumetshofer.nutric.use_cases.dto.Nutrition;
import dev.rumetshofer.nutric.use_cases.dto.ProductData;
import dev.rumetshofer.nutric.use_cases.dto.Serving;
import dev.rumetshofer.nutric.use_cases.enums.Unit;
import dev.rumetshofer.nutric.use_cases.enums.YazioServingUnit;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
public class SearchFoodUseCase {

    private final YazioSearchService yazioSearchService;

    public SearchFoodUseCase(YazioSearchService yazioSearchService) {
        this.yazioSearchService = yazioSearchService;
    }

    public List<ProductData> search(String query) {
        return yazioSearchService.search(query).stream()
                .map(this::toProductData)
                .toList();
    }

    private ProductData toProductData(YazioProduct yazioProduct) {
        Serving serving = null;
        if (yazioProduct.serving_quantity() != yazioProduct.amount()) {
            serving = Serving.builder()
                    .unit(YazioServingUnit.fromValue(yazioProduct.serving(), YazioServingUnit.PORTION).getDomainServingUnit())
                    .baseUnitAmount(yazioProduct.amount())
                    .build();
        }

        return ProductData.builder()
                .name(yazioProduct.name())
                .producer(yazioProduct.producer())
                .serving(Optional.ofNullable(serving))
                .baseUnit(Unit.fromAbbreviation(yazioProduct.base_unit()))
                .nutritionPerBaseUnit(Nutrition.builder()
                        .energy(yazioProduct.nutrients().energy())
                        .carbs(yazioProduct.nutrients().carb())
                        .fat(yazioProduct.nutrients().fat())
                        .protein(yazioProduct.nutrients().protein())
                        .build()
                )
                .externalUuid(UUID.fromString(yazioProduct.product_id()))
                .uuid(Optional.empty())
                .isCustomized(false)
                .isExternal(true)
                .build();
    }
}
