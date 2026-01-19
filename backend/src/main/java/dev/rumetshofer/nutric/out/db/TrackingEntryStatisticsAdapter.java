package dev.rumetshofer.nutric.out.db;

import dev.rumetshofer.nutric.out.db.entities.TrackingEntryDbModel;
import dev.rumetshofer.nutric.out.db.projections.ProductIdProjection;
import dev.rumetshofer.nutric.out.db.repositories.TrackingEntryRepository;
import dev.rumetshofer.nutric.use_cases.enums.MealType;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@AllArgsConstructor
public class TrackingEntryStatisticsAdapter {

    private final TrackingEntryRepository trackingEntryRepository;

    public List<TrackingEntryDbModel> getFrequentlyTrackedFoods(UUID userUuid, MealType mealType, int daysBack, int limit) {
        List<ProductIdProjection> productIds = trackingEntryRepository.getFrequentlyUsedProducts(
                userUuid,
                mealType,
                LocalDateTime.now().minusDays(daysBack),
                limit
        );

        return productIds.stream()
                .map(productId ->
                        trackingEntryRepository.findFirstByProductIdOrderByTrackedAtDesc(productId.productId())
                )
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();
    }

}
