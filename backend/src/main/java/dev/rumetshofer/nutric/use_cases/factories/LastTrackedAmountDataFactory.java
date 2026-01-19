package dev.rumetshofer.nutric.use_cases.factories;

import dev.rumetshofer.nutric.out.db.entities.TrackingEntryDbModel;
import dev.rumetshofer.nutric.use_cases.dto.LastTrackedAmountData;
import org.springframework.stereotype.Component;

@Component
public class LastTrackedAmountDataFactory {

    public LastTrackedAmountData fromTrackingEntryDbModel(TrackingEntryDbModel trackingEntryDbModel) {
        return LastTrackedAmountData.builder()
                .amountInBaseUnit(trackingEntryDbModel.getAmountInBaseUnit())
                .trackedInBaseUnit(trackingEntryDbModel.isTrackedInBaseUnit())
                .build();
    }

}
