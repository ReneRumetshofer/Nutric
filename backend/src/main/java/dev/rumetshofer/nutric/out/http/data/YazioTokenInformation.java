package dev.rumetshofer.nutric.out.http.data;

import lombok.Builder;

@Builder
public record YazioTokenInformation(
        String access_token,
        int expires_in,
        String refresh_token,
        String token_type
) {
}