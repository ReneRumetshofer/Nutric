package dev.rumetshofer.nutric.controllers;

import dev.rumetshofer.nutric.use_cases.LastTrackedFoodsUseCase;
import dev.rumetshofer.nutric.use_cases.dto.LastTrackedFoodData;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/tracking-entries/last-tracked")
public class LastTrackedController {

    private final LastTrackedFoodsUseCase lastTrackedFoodsUseCase;

    public LastTrackedController(LastTrackedFoodsUseCase lastTrackedFoodsUseCase) {
        this.lastTrackedFoodsUseCase = lastTrackedFoodsUseCase;
    }

    @GetMapping
    public List<LastTrackedFoodData> getLastTrackedFoods(
            @RequestAttribute("userUuid") UUID userUuid
    ) {
        return lastTrackedFoodsUseCase.getLastTrackedFoods(userUuid);
    }

}
