package dev.rumetshofer.nutric.out.http;

import dev.rumetshofer.nutric.out.http.data.YazioProduct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.List;

@Component
public class YazioSearchService {

    @Value("${yazio.api.searchUrl}")
    private String yazioApiSearchUrl;

    private final RestClient yazioRestClient;

    public YazioSearchService(RestClient yazioRestClient) {
        this.yazioRestClient = yazioRestClient;
    }

    public List<YazioProduct> search(String query) {
        String uri = String.format("%s?query={query}&sex={sex}&countries={countries}", yazioApiSearchUrl);
         return yazioRestClient
                .get()
                .uri(uri, query, "male", "AT")
                .retrieve()
                .body(new ParameterizedTypeReference<>() {});
    }

}
