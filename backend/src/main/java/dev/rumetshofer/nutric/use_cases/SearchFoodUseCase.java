package dev.rumetshofer.nutric.use_cases;

import dev.rumetshofer.nutric.out.http.YazioSearchService;
import dev.rumetshofer.nutric.out.http.data.YazioProduct;
import dev.rumetshofer.nutric.use_cases.dto.ProductData;
import dev.rumetshofer.nutric.use_cases.enums.Serving;
import dev.rumetshofer.nutric.use_cases.enums.Unit;
import org.springframework.stereotype.Component;

import java.util.List;

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
        return ProductData.builder()
                .name(yazioProduct.name())
                .producer(yazioProduct.producer())
                .serving(Serving.fromValue(yazioProduct.serving()))
                .servingQuantity(yazioProduct.serving_quantity())
                .amount(yazioProduct.amount())
                .baseUnit(Unit.fromAbbreviation(yazioProduct.base_unit()))
                .energyPerBaseUnit(yazioProduct.nutrients().energy())
                .carbsPerBaseUnit(yazioProduct.nutrients().carb())
                .fatPerBaseUnit(yazioProduct.nutrients().fat())
                .proteinPerBaseUnit(yazioProduct.nutrients().protein())
                .externalUuid(yazioProduct.product_id())
                .build();
    }
}
