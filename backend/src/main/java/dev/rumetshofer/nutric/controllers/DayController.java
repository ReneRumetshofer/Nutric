package dev.rumetshofer.nutric.controllers;

import dev.rumetshofer.nutric.use_cases.GetDayUseCase;
import dev.rumetshofer.nutric.use_cases.dto.DayData;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.UUID;

@RestController
@RequestMapping("/days")
public class DayController {

    private final GetDayUseCase getDayUseCase;

    public DayController(GetDayUseCase getDayUseCase) {
        this.getDayUseCase = getDayUseCase;
    }

    @GetMapping
    public ResponseEntity<DayData> getDay(
            @RequestAttribute("userUuid") UUID userUuid,
            @RequestParam("day") LocalDate day
    ) {
        return getDayUseCase.getDay(day, userUuid)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }

}
