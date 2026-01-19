package dev.rumetshofer.nutric.use_cases;

import dev.rumetshofer.nutric.out.db.repositories.ProductRepository;
import dev.rumetshofer.nutric.out.db.repositories.TrackingEntryRepository;
import dev.rumetshofer.nutric.out.http.YazioSearchService;
import dev.rumetshofer.nutric.out.http.data.YazioProduct;
import dev.rumetshofer.nutric.use_cases.dto.*;
import dev.rumetshofer.nutric.use_cases.enums.Unit;
import dev.rumetshofer.nutric.use_cases.enums.YazioServingUnit;
import dev.rumetshofer.nutric.use_cases.factories.LastTrackedAmountDataFactory;
import dev.rumetshofer.nutric.use_cases.factories.ProductDataFactory;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
public class SearchFoodUseCase {

    private final YazioSearchService yazioSearchService;
    private final ProductRepository productRepository;
    private final ProductDataFactory productDataFactory;
    private final TrackingEntryRepository trackingEntryRepository;
    private final LastTrackedAmountDataFactory lastTrackedAmountDataFactory;

    public SearchFoodUseCase(YazioSearchService yazioSearchService, ProductRepository productRepository, ProductDataFactory productDataFactory, TrackingEntryRepository trackingEntryRepository, LastTrackedAmountDataFactory lastTrackedAmountDataFactory) {
        this.yazioSearchService = yazioSearchService;
        this.productRepository = productRepository;
        this.productDataFactory = productDataFactory;
        this.trackingEntryRepository = trackingEntryRepository;
        this.lastTrackedAmountDataFactory = lastTrackedAmountDataFactory;
    }

    public List<SearchResultData> search(String query, UUID userUuid) {
        return yazioSearchService.search(query).stream()
                .map((yazioProduct) -> tryFindLocalProduct(yazioProduct, userUuid))
                .toList();
    }

    private SearchResultData tryFindLocalProduct(YazioProduct yazioProduct, UUID userUuid) {
        return productRepository.findByExternalUuid(UUID.fromString(yazioProduct.product_id()))
                .map((productDbModel) -> {
                    Optional<LastTrackedAmountData> lastTrackedAmountData = trackingEntryRepository
                            .findTopByProductAndDay_UserUuidOrderByTrackedAtDesc(productDbModel, userUuid)
                            .map(lastTrackedAmountDataFactory::fromTrackingEntryDbModel);

                    return SearchResultData.builder()
                            .productData(productDataFactory.fromProductDbModel(productDbModel))
                            .lastTrackedAmountData(lastTrackedAmountData)
                            .build();
                })
                .orElseGet(() ->
                        SearchResultData.builder()
                            .productData(toProductData(yazioProduct))
                            .lastTrackedAmountData(Optional.empty())
                            .build()
                );
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
