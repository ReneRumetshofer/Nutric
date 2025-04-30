package dev.rumetshofer.nutric.use_cases;

import dev.rumetshofer.nutric.out.db.entities.TrackingEntryDbModel;
import dev.rumetshofer.nutric.out.db.repositories.TrackingEntryRepository;
import dev.rumetshofer.nutric.use_cases.dto.in.UpdateTrackingEntryRequest;
import dev.rumetshofer.nutric.use_cases.exceptions.TrackingEntryNotFoundException;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class UpdateTrackingEntryUseCase {

    private final TrackingEntryRepository trackingEntryRepository;

    public void update(UUID trackingEntryUuid, UUID userUuid, UpdateTrackingEntryRequest request) {
        TrackingEntryDbModel foundEntry = trackingEntryRepository
                .findByUuidAndDay_UserUuid(trackingEntryUuid, userUuid)
                .orElseThrow(() -> new TrackingEntryNotFoundException(trackingEntryUuid));

        foundEntry.setAmount(request.amount());
        foundEntry.setTrackedInBaseUnit(request.trackedInBaseUnit());
        trackingEntryRepository.save(foundEntry);
    }

    public UpdateTrackingEntryUseCase(TrackingEntryRepository trackingEntryRepository) {
        this.trackingEntryRepository = trackingEntryRepository;
    }
}
