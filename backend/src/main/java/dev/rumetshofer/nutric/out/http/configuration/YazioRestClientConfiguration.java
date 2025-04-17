package dev.rumetshofer.nutric.out.http.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.client.RestClient;

@Configuration
public class YazioRestClientConfiguration {

    @Value("${yazio.api.urlBase}")
    private String yazioApiUrlBase;

    private final YazioBearerTokenProvider tokenProvider;

    public YazioRestClientConfiguration(YazioBearerTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Bean
    public RestClient yazioRestClient() {
        return RestClient.builder()
                .baseUrl(yazioApiUrlBase)
                .requestInterceptor((request, body, execution) -> {
                    String token = tokenProvider.getToken();
                    request.getHeaders().setBearerAuth(token);

                    ClientHttpResponse response = execution.execute(request, body);

                    if (response.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                        tokenProvider.refreshToken();
                        request.getHeaders().setBearerAuth(tokenProvider.getToken());
                        response.close();
                        return execution.execute(request, body);
                    }

                    return response;
                })
                .build();
    }

}
