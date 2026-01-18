package dev.rumetshofer.nutric.use_cases;

import dev.rumetshofer.nutric.out.db.entities.TrackingEntryDbModel;
import dev.rumetshofer.nutric.out.db.repositories.TrackingEntryRepository;
import dev.rumetshofer.nutric.use_cases.dto.LastTrackedFoodData;
import dev.rumetshofer.nutric.use_cases.factories.LastTrackedAmountDataFactory;
import dev.rumetshofer.nutric.use_cases.factories.ProductDataFactory;
import org.springframework.data.domain.Limit;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class LastTrackedFoodsUseCase {

    public static final int MAX_LAST_TRACKED_FOODS = 50;

    private final TrackingEntryRepository trackingEntryRepository;
    private final ProductDataFactory productDataFactory;
    private final LastTrackedAmountDataFactory lastTrackedAmountDataFactory;

    public LastTrackedFoodsUseCase(TrackingEntryRepository trackingEntryRepository, ProductDataFactory productDataFactory, LastTrackedAmountDataFactory lastTrackedAmountDataFactory) {
        this.trackingEntryRepository = trackingEntryRepository;
        this.productDataFactory = productDataFactory;
        this.lastTrackedAmountDataFactory = lastTrackedAmountDataFactory;
    }

    public List<LastTrackedFoodData> getLastTrackedFoods(UUID userUuid) {
        return trackingEntryRepository
                .findAllByDay_UserUuidOrderByTrackedAtDesc(userUuid, Limit.of(MAX_LAST_TRACKED_FOODS))
                .stream()
                .map(this::toLastTrackedFoodData)
                .toList();
    }

    private LastTrackedFoodData toLastTrackedFoodData(TrackingEntryDbModel trackingEntryDbModel) {
        return LastTrackedFoodData.builder()
                .productData(productDataFactory.fromProductDbModel(trackingEntryDbModel.getProduct()))
                .lastTrackedAmountData(lastTrackedAmountDataFactory.fromTrackingEntryDbModel(trackingEntryDbModel))
                .build();
    }

}
