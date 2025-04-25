package dev.rumetshofer.nutric.use_cases;

import dev.rumetshofer.nutric.out.db.entities.TrackingEntryDbModel;
import dev.rumetshofer.nutric.out.db.repositories.DayRepository;
import dev.rumetshofer.nutric.out.db.repositories.TrackingEntryRepository;
import dev.rumetshofer.nutric.use_cases.exceptions.AuthorizationException;
import dev.rumetshofer.nutric.use_cases.exceptions.TrackingEntryNotFoundException;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class DeleteTrackingEntryUseCase {

    private final TrackingEntryRepository trackingEntryRepository;

    public DeleteTrackingEntryUseCase(TrackingEntryRepository trackingEntryRepository) {
        this.trackingEntryRepository = trackingEntryRepository;
    }

    public void deleteTrackingEntry(UUID userUuid, UUID trackingEntryUuid) {
        TrackingEntryDbModel trackingEntryDbModel = trackingEntryRepository.findByUuid(trackingEntryUuid)
                .orElseThrow(() -> new TrackingEntryNotFoundException(trackingEntryUuid));

        if (!trackingEntryDbModel.getDay().getUserUuid().equals(userUuid)) {
            throw new AuthorizationException(
                    String.format("Tracking entry \"%s\" does not belong to the user \"%s\"", trackingEntryUuid, userUuid)
            );
        }

        trackingEntryRepository.delete(trackingEntryDbModel);
    }

}
