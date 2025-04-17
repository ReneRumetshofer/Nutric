package dev.rumetshofer.nutric.out.http.data;

import lombok.Builder;

@Builder
public record YazioTokenRequest(
        String client_id,
        String client_secret,
        String username,
        String password,
        String grant_type
) {
}