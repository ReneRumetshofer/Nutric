package dev.rumetshofer.nutric.use_cases.exceptions;

import lombok.Getter;

import java.util.UUID;

@Getter
public class TrackingEntryNotFoundException extends RuntimeException {

    private final UUID trackingEntryUuid;

    public TrackingEntryNotFoundException(UUID trackingEntryUuid) {
        super("Tracking entry with UUID " + trackingEntryUuid + " not found");
        this.trackingEntryUuid = trackingEntryUuid;
    }

}
