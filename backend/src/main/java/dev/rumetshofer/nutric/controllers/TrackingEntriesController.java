package dev.rumetshofer.nutric.controllers;

import dev.rumetshofer.nutric.controllers.requests.TrackFoodRestRequest;
import dev.rumetshofer.nutric.use_cases.DeleteTrackingEntryUseCase;
import dev.rumetshofer.nutric.use_cases.GetTrackingEntriesUseCase;
import dev.rumetshofer.nutric.use_cases.TrackFoodUseCase;
import dev.rumetshofer.nutric.use_cases.UpdateTrackingEntryUseCase;
import dev.rumetshofer.nutric.use_cases.dto.TrackingEntryData;
import dev.rumetshofer.nutric.use_cases.dto.in.TrackFoodRequest;
import dev.rumetshofer.nutric.use_cases.dto.in.UpdateTrackingEntryRequest;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/days/{day}/tracking-entries")
public class TrackingEntriesController {

    private final TrackFoodUseCase trackFoodUseCase;
    private final GetTrackingEntriesUseCase getTrackingEntriesUseCase;
    private final DeleteTrackingEntryUseCase deleteTrackingEntryUseCase;
    private final UpdateTrackingEntryUseCase updateTrackingEntryUseCase;

    public TrackingEntriesController(TrackFoodUseCase trackFoodUseCase, GetTrackingEntriesUseCase getTrackingEntriesUseCase, DeleteTrackingEntryUseCase deleteTrackingEntryUseCase, UpdateTrackingEntryUseCase updateTrackingEntryUseCase) {
        this.trackFoodUseCase = trackFoodUseCase;
        this.getTrackingEntriesUseCase = getTrackingEntriesUseCase;
        this.deleteTrackingEntryUseCase = deleteTrackingEntryUseCase;
        this.updateTrackingEntryUseCase = updateTrackingEntryUseCase;
    }

    @PostMapping
    public void trackFood(
            @RequestAttribute("userUuid") UUID userUuid,
            @PathVariable("day") LocalDate day,
            @RequestBody TrackFoodRestRequest trackFoodRequest
    ) {
        TrackFoodRequest request = TrackFoodRequest.builder()
                .userUuid(userUuid)
                .day(day)
                .product(trackFoodRequest.product())
                .mealType(trackFoodRequest.mealType())
                .amount(trackFoodRequest.amount())
                .baseUnit(trackFoodRequest.baseUnit())
                .trackedInBaseUnit(trackFoodRequest.trackedInBaseUnit())
                .build();
        trackFoodUseCase.track(request);
    }

    @GetMapping
    public List<TrackingEntryData> getTrackingEntriesForDay(
            @RequestAttribute("userUuid") UUID userUuid,
            @PathVariable("day") LocalDate day
    ) {
        return getTrackingEntriesUseCase.getEntries(userUuid, day);
    }

    @DeleteMapping("/{trackingEntryUuid}")
    public void deleteTrackingEntry(
            @RequestAttribute("userUuid") UUID userUuid,
            @PathVariable("trackingEntryUuid") UUID trackingEntryUuid
    ) {
        deleteTrackingEntryUseCase.deleteTrackingEntry(userUuid, trackingEntryUuid);
    }

    @PutMapping("/{trackingEntryUuid}")
    public void updateTrackingEntry(
            @RequestAttribute("userUuid") UUID userUuid,
            @PathVariable("trackingEntryUuid") UUID trackingEntryUuid,
            @RequestBody UpdateTrackingEntryRequest updateTrackingEntryRequest
    ) {
        updateTrackingEntryUseCase.update(trackingEntryUuid, userUuid, updateTrackingEntryRequest);
    }

}
