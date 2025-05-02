package dev.rumetshofer.nutric.use_cases;

import dev.rumetshofer.nutric.out.db.repositories.DayRepository;
import dev.rumetshofer.nutric.use_cases.dto.DayData;
import dev.rumetshofer.nutric.use_cases.factories.DayDataFactory;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

@Component
public class GetDayUseCase {

    private final DayRepository dayRepository;
    private final DayDataFactory dayDataFactory;

    public GetDayUseCase(DayRepository dayRepository, DayDataFactory dayDataFactory) {
        this.dayRepository = dayRepository;
        this.dayDataFactory = dayDataFactory;
    }

    public Optional<DayData> getDay(LocalDate day, UUID userUuid) {
        return dayRepository.findByDayAndUserUuid(day, userUuid)
                .map(dayDataFactory::toDayData);
    }

}
