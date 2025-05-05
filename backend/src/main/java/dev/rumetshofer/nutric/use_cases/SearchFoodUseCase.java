package dev.rumetshofer.nutric.use_cases;

import dev.rumetshofer.nutric.out.db.entities.TrackingEntryDbModel;
import dev.rumetshofer.nutric.out.db.repositories.ProductRepository;
import dev.rumetshofer.nutric.out.db.repositories.TrackingEntryRepository;
import dev.rumetshofer.nutric.out.http.YazioSearchService;
import dev.rumetshofer.nutric.out.http.data.YazioProduct;
import dev.rumetshofer.nutric.use_cases.dto.*;
import dev.rumetshofer.nutric.use_cases.enums.Unit;
import dev.rumetshofer.nutric.use_cases.enums.YazioServingUnit;
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

    public SearchFoodUseCase(YazioSearchService yazioSearchService, ProductRepository productRepository, ProductDataFactory productDataFactory, TrackingEntryRepository trackingEntryRepository) {
        this.yazioSearchService = yazioSearchService;
        this.productRepository = productRepository;
        this.productDataFactory = productDataFactory;
        this.trackingEntryRepository = trackingEntryRepository;
    }

    public List<SearchResultData> search(String query) {
        return yazioSearchService.search(query).stream()
                .map(this::tryFindLocalProduct)
                .toList();
    }

    private SearchResultData tryFindLocalProduct(YazioProduct yazioProduct) {
        return productRepository.findByExternalUuid(UUID.fromString(yazioProduct.product_id()))
                .map((productDbModel) -> {
                    Optional<LastTrackedData> lastTrackedData = trackingEntryRepository.findTopByProductOrderByTrackedAtDesc(productDbModel)
                            .map(this::toLastTrackedData);

                    return SearchResultData.builder()
                            .productData(productDataFactory.fromProductDbModel(productDbModel))
                            .lastTrackedData(lastTrackedData)
                            .build();
                })
                .orElseGet(() ->
                        SearchResultData.builder()
                            .productData(toProductData(yazioProduct))
                            .lastTrackedData(Optional.empty())
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

    private LastTrackedData toLastTrackedData(TrackingEntryDbModel trackingEntryDbModel) {
        return LastTrackedData.builder()
                .amount(trackingEntryDbModel.getAmount())
                .trackedInBaseUnit(trackingEntryDbModel.isTrackedInBaseUnit())
                .build();
    }
}
