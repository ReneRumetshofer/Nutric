package dev.rumetshofer.nutric.out.http.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class RestClientConfiguration {

    @Bean
    public RestClient defaultRestClient() {
        return RestClient.create();
    }

}
