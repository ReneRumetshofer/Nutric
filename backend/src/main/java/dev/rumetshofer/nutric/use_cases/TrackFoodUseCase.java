package dev.rumetshofer.nutric.use_cases;

import dev.rumetshofer.nutric.out.db.entities.DayDbModel;
import dev.rumetshofer.nutric.out.db.entities.ProductDbModel;
import dev.rumetshofer.nutric.out.db.entities.TrackingEntryDbModel;
import dev.rumetshofer.nutric.out.db.repositories.DayRepository;
import dev.rumetshofer.nutric.out.db.repositories.ProductRepository;
import dev.rumetshofer.nutric.out.db.repositories.TrackingEntryRepository;
import dev.rumetshofer.nutric.use_cases.dto.ProductData;
import dev.rumetshofer.nutric.use_cases.dto.Serving;
import dev.rumetshofer.nutric.use_cases.dto.in.TrackFoodRequest;
import dev.rumetshofer.nutric.use_cases.enums.MealType;
import dev.rumetshofer.nutric.use_cases.exceptions.DayNotFoundException;
import dev.rumetshofer.nutric.use_cases.exceptions.ProductNotFoundException;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.UUID;

@Component
public class TrackFoodUseCase {

    private final ProductRepository productRepository;
    private final DayRepository dayRepository;
    private final TrackingEntryRepository trackingEntryRepository;

    public TrackFoodUseCase(ProductRepository productRepository, DayRepository dayRepository, TrackingEntryRepository trackingEntryRepository) {
        this.productRepository = productRepository;
        this.dayRepository = dayRepository;
        this.trackingEntryRepository = trackingEntryRepository;
    }

    public void track(TrackFoodRequest request) {
        ProductDbModel productDbModel = null;
        if (request.product().uuid().isPresent()) {
            UUID uuid = request.product().uuid().get();
            productDbModel = productRepository.findByUuid(uuid)
                    .orElseThrow(() -> new ProductNotFoundException(uuid));
        }
        else {
            productDbModel = createProductWithoutDuplicates(request.product());
        }

        DayDbModel dayDbModel = dayRepository.findByDayAndUserUuid(request.day(), request.userUuid())
                .orElseThrow(() -> new DayNotFoundException(request.day(), request.userUuid()));

        TrackingEntryDbModel trackingEntryDbModel = constructTrackingEntryDbModel(
                productDbModel,
                dayDbModel,
                request.mealType(),
                request.amount(),
                request.trackedInBaseUnit()
        );
        trackingEntryRepository.save(trackingEntryDbModel);
    }

    private ProductDbModel createProductWithoutDuplicates(ProductData productData) {
        return productRepository.findByExternalUuid(productData.externalUuid())
                .orElseGet(() -> productRepository.save(constructNewProductDbModel(productData)));
    }

    private ProductDbModel constructNewProductDbModel(ProductData productData) {
        return ProductDbModel.builder()
                .uuid(UUID.randomUUID())
                .externalUuid(productData.externalUuid())
                .name(productData.name())
                .producer(productData.producer())
                .servingUnit(productData.serving().map(Serving::unit).orElse(null))
                .baseUnitAmount(productData.serving().map(s -> BigDecimal.valueOf(s.baseUnitAmount())).orElse(null))
                .baseUnit(productData.baseUnit())
                .caloriesPerBaseUnit(BigDecimal.valueOf(productData.nutritionPerBaseUnit().energy()))
                .carbsPerBaseUnit(BigDecimal.valueOf(productData.nutritionPerBaseUnit().carbs()))
                .proteinPerBaseUnit(BigDecimal.valueOf(productData.nutritionPerBaseUnit().protein()))
                .fatPerBaseUnit(BigDecimal.valueOf(productData.nutritionPerBaseUnit().fat()))
                .isCustomized(false)
                .build();
    }

    private TrackingEntryDbModel constructTrackingEntryDbModel(ProductDbModel productDbModel, DayDbModel dayDbModel, MealType mealType, BigDecimal amount, boolean trackedInBaseUnit) {
        return TrackingEntryDbModel.builder()
                .uuid(UUID.randomUUID())
                .day(dayDbModel)
                .mealType(mealType)
                .product(productDbModel)
                .amount(amount)
                .baseUnit(productDbModel.getBaseUnit())
                .caloriesPerBaseUnit(productDbModel.getCaloriesPerBaseUnit())
                .carbsPerBaseUnit(productDbModel.getCarbsPerBaseUnit())
                .proteinPerBaseUnit(productDbModel.getProteinPerBaseUnit())
                .fatPerBaseUnit(productDbModel.getFatPerBaseUnit())
                .trackedInBaseUnit(trackedInBaseUnit)
                .build();
    }
}
