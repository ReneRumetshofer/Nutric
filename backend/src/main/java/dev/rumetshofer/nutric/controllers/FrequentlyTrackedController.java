package dev.rumetshofer.nutric.controllers;

import dev.rumetshofer.nutric.use_cases.FrequentlyTrackedFoodsUseCase;
import dev.rumetshofer.nutric.use_cases.dto.LastTrackedFoodData;
import dev.rumetshofer.nutric.use_cases.enums.MealType;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/tracking-entries/frequently-tracked")
@AllArgsConstructor
public class FrequentlyTrackedController {

    private final FrequentlyTrackedFoodsUseCase frequentlyTrackedFoodsUseCase;

    @GetMapping
    public List<LastTrackedFoodData> getFrequentlyTrackedFoods(
            @RequestAttribute("userUuid") UUID userUuid,
            @RequestParam("mealType") MealType mealType
    ) {
        return frequentlyTrackedFoodsUseCase.getFrequentlyTrackedFoods(userUuid, mealType);
    }

}
