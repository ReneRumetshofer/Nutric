package dev.rumetshofer.nutric.use_cases;

import dev.rumetshofer.nutric.out.db.TrackingEntryStatisticsAdapter;
import dev.rumetshofer.nutric.out.db.entities.TrackingEntryDbModel;
import dev.rumetshofer.nutric.use_cases.dto.LastTrackedFoodData;
import dev.rumetshofer.nutric.use_cases.enums.MealType;
import dev.rumetshofer.nutric.use_cases.factories.LastTrackedAmountDataFactory;
import dev.rumetshofer.nutric.use_cases.factories.ProductDataFactory;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
@AllArgsConstructor
public class FrequentlyTrackedFoodsUseCase {

    public static final int MAX_FREQUENTLY_TRACKED_FOODS = 50;
    public static final int STATISTICS_DAYS = 90;

    private final TrackingEntryStatisticsAdapter trackingEntryStatisticsAdapter;
    private final ProductDataFactory productDataFactory;
    private final LastTrackedAmountDataFactory lastTrackedAmountDataFactory;

    public List<LastTrackedFoodData> getFrequentlyTrackedFoods(UUID userUuid, MealType mealType) {
        return trackingEntryStatisticsAdapter
                .getFrequentlyTrackedFoods(userUuid, mealType, STATISTICS_DAYS, MAX_FREQUENTLY_TRACKED_FOODS)
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
