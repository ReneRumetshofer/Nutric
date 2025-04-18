package dev.rumetshofer.nutric.controllers;

import dev.rumetshofer.nutric.use_cases.SearchFoodUseCase;
import dev.rumetshofer.nutric.use_cases.dto.ProductData;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/foods/search")
public class SearchFoodController {

    private final SearchFoodUseCase searchFoodUseCase;

    public SearchFoodController(SearchFoodUseCase searchFoodUseCase) {
        this.searchFoodUseCase = searchFoodUseCase;
    }

    @GetMapping
    public List<ProductData> search(@RequestParam("query") String query) {
        return searchFoodUseCase.search(query);
    }

}
