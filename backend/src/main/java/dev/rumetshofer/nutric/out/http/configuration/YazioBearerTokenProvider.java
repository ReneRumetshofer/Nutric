package dev.rumetshofer.nutric.out.http.configuration;

import dev.rumetshofer.nutric.out.http.data.YazioTokenInformation;
import dev.rumetshofer.nutric.out.http.data.YazioTokenRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class YazioBearerTokenProvider {

    @Value("${yazio.api.urlBase}")
    private String yazioApiUrlBase;

    @Value("${yazio.api.oauthTokenUrl}")
    private String yazioApiOauthTokenUrl;

    @Value("${yazio.auth.clientId}")
    private String yazioApiClientId;

    @Value("${yazio.auth.clientSecret}")
    private String yazioApiClientSecret;

    @Value("${yazio.auth.user}")
    private String yazioApiUser;

    @Value("${yazio.auth.password}")
    private String yazioApiPassword;

    private final RestClient defaultRestClient;

    private String currentToken;

    public YazioBearerTokenProvider(RestClient defaultRestClient) {
        this.defaultRestClient = defaultRestClient;
    }

    public synchronized String getToken() {
        if (currentToken == null) {
            currentToken = fetchNewToken();
        }
        return currentToken;
    }

    public synchronized void refreshToken() {
        currentToken = fetchNewToken();
    }

    private String fetchNewToken() {
        YazioTokenRequest request = YazioTokenRequest.builder()
                .client_id(yazioApiClientId)
                .client_secret(yazioApiClientSecret)
                .username(yazioApiUser)
                .password(yazioApiPassword)
                .grant_type("password")
                .build();

        YazioTokenInformation tokenInformation = defaultRestClient.post().uri(yazioApiUrlBase + yazioApiOauthTokenUrl)
                .body(request)
                .retrieve()
                .body(YazioTokenInformation.class);

        return tokenInformation.access_token();
    }

}
