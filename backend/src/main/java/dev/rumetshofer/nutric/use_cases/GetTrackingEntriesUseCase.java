package dev.rumetshofer.nutric.use_cases;

import dev.rumetshofer.nutric.out.db.entities.TrackingEntryDbModel;
import dev.rumetshofer.nutric.out.db.repositories.TrackingEntryRepository;
import dev.rumetshofer.nutric.use_cases.dto.Nutrition;
import dev.rumetshofer.nutric.use_cases.dto.TrackingEntryData;
import dev.rumetshofer.nutric.use_cases.factories.ProductDataFactory;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Component
public class GetTrackingEntriesUseCase {

    private final TrackingEntryRepository trackingEntryRepository;
    private final ProductDataFactory productDataFactory;

    public GetTrackingEntriesUseCase(TrackingEntryRepository trackingEntryRepository, ProductDataFactory productDataFactory) {
        this.trackingEntryRepository = trackingEntryRepository;
        this.productDataFactory = productDataFactory;
    }

    public List<TrackingEntryData> getEntries(UUID userUuid, LocalDate day) {
        return trackingEntryRepository.findAllByDay_DayAndDay_UserUuid(day, userUuid)
                .stream()
                .map(this::toTrackingEntryData)
                .toList();
    }

    private TrackingEntryData toTrackingEntryData(TrackingEntryDbModel trackingEntryDbModel) {
        return TrackingEntryData.builder()
                .uuid(trackingEntryDbModel.getUuid())
                .mealType(trackingEntryDbModel.getMealType())
                .product(productDataFactory.fromProductDbModel(trackingEntryDbModel.getProduct()))
                .amount(trackingEntryDbModel.getAmount())
                .baseUnit(trackingEntryDbModel.getBaseUnit())
                .trackedInBaseUnit(trackingEntryDbModel.isTrackedInBaseUnit())
                .nutritionPerBaseUnit(Nutrition.builder()
                        .energy(trackingEntryDbModel.getCaloriesPerBaseUnit().doubleValue())
                        .carbs(trackingEntryDbModel.getCarbsPerBaseUnit().doubleValue())
                        .protein(trackingEntryDbModel.getProteinPerBaseUnit().doubleValue())
                        .fat(trackingEntryDbModel.getFatPerBaseUnit().doubleValue())
                        .build())
                .build();
    }
}
