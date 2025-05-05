package dev.rumetshofer.nutric.controllers;

import dev.rumetshofer.nutric.use_cases.SearchFoodUseCase;
import dev.rumetshofer.nutric.use_cases.dto.SearchResultData;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/foods/search")
public class SearchFoodController {

    private final SearchFoodUseCase searchFoodUseCase;

    public SearchFoodController(SearchFoodUseCase searchFoodUseCase) {
        this.searchFoodUseCase = searchFoodUseCase;
    }

    @GetMapping
    public List<SearchResultData> search(
            @RequestParam("query") String query,
            @RequestAttribute("userUuid") UUID userUuid
    ) {
        return searchFoodUseCase.search(query, userUuid);
    }

}
