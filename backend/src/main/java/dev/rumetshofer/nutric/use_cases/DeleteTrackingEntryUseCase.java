package dev.rumetshofer.nutric.use_cases;

import dev.rumetshofer.nutric.out.db.entities.TrackingEntryDbModel;
import dev.rumetshofer.nutric.out.db.repositories.DayRepository;
import dev.rumetshofer.nutric.out.db.repositories.TrackingEntryRepository;
import dev.rumetshofer.nutric.use_cases.exceptions.AuthorizationException;
import dev.rumetshofer.nutric.use_cases.exceptions.TrackingEntryNotFoundException;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class DeleteTrackingEntryUseCase {

    private final TrackingEntryRepository trackingEntryRepository;
    private final DayRepository dayRepository;

    public DeleteTrackingEntryUseCase(TrackingEntryRepository trackingEntryRepository, DayRepository dayRepository) {
        this.trackingEntryRepository = trackingEntryRepository;
        this.dayRepository = dayRepository;
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

        List<TrackingEntryDbModel> trackingEntriesLeft = trackingEntryRepository
                .findAllByDay_DayAndDay_UserUuid(trackingEntryDbModel.getDay().getDay(), userUuid);
        if (trackingEntriesLeft.isEmpty()) {
            dayRepository.delete(trackingEntryDbModel.getDay());
        }
    }

}
