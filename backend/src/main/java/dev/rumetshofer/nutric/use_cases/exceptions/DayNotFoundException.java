package dev.rumetshofer.nutric.use_cases.exceptions;

import lombok.Getter;

import java.time.LocalDate;
import java.util.UUID;

@Getter
public class DayNotFoundException extends RuntimeException {

    private final LocalDate day;
    private final UUID userUuid;

    public DayNotFoundException(LocalDate day, UUID userUuid) {
        super("Day " + day + " not found for user with UUID " + userUuid);
        this.day = day;
        this.userUuid = userUuid;
    }
}
