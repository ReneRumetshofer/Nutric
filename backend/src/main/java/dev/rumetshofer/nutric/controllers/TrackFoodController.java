package dev.rumetshofer.nutric.controllers;

import dev.rumetshofer.nutric.use_cases.TrackFoodUseCase;
import dev.rumetshofer.nutric.use_cases.dto.TrackFoodRequest;
import dev.rumetshofer.nutric.use_cases.enums.MealType;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@RestController
@RequestMapping("/days/{day}/tracking-entries")
public class TrackFoodController {

    private final TrackFoodUseCase trackFoodUseCase;

    public TrackFoodController(TrackFoodUseCase trackFoodUseCase) {
        this.trackFoodUseCase = trackFoodUseCase;
    }

    @PostMapping
    public void trackFood(
            @RequestAttribute("userUuid") UUID userUuid,
            @PathVariable("day") LocalDate day,
            @RequestBody TrackFoodRequest trackFoodRequest
    ) {
        TrackFoodRequest request = TrackFoodRequest.builder()
                .userUuid(userUuid)
                .day(day)
                .product(trackFoodRequest.product())
                .mealType(trackFoodRequest.mealType())
                .amount(trackFoodRequest.amount())
                .baseUnit(trackFoodRequest.baseUnit())
                .build();
        trackFoodUseCase.track(request);
    }

}
