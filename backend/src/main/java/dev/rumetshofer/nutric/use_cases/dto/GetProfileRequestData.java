package dev.rumetshofer.nutric.use_cases.dto;

import lombok.Builder;

import java.util.UUID;

@Builder(toBuilder = true)
public record GetProfileRequestData(
        UUID userUuid,
        String firstName,
        String lastName,
        String email
) {
}
