package dev.rumetshofer.nutric.use_cases.exceptions;

import lombok.Getter;

import java.util.UUID;

@Getter
public class ProfileNotFoundException extends RuntimeException {

    private final UUID userUuid;

    public ProfileNotFoundException(UUID userUuid) {
        super("Profile not found for user with UUID: " + userUuid);
        this.userUuid = userUuid;
    }

}
