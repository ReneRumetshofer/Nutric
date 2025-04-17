package dev.rumetshofer.nutric.controllers;

import dev.rumetshofer.nutric.out.http.YazioSearchService;
import dev.rumetshofer.nutric.out.http.data.YazioProduct;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/yazio")
public class YazioSearchController {

    private final YazioSearchService yazioSearchService;

    public YazioSearchController(YazioSearchService yazioSearchService) {
        this.yazioSearchService = yazioSearchService;
    }

    @GetMapping
    public List<YazioProduct> search(@RequestParam("query") String query) {
        return yazioSearchService.search(query);
    }

}
