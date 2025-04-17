package dev.rumetshofer.nutric.use_cases;

import dev.rumetshofer.nutric.out.db.entities.DayDbModel;
import dev.rumetshofer.nutric.out.db.entities.ProfileDbModel;
import dev.rumetshofer.nutric.out.db.repositories.DayRepository;
import dev.rumetshofer.nutric.out.db.repositories.ProfileRepository;
import dev.rumetshofer.nutric.use_cases.dto.DayData;
import dev.rumetshofer.nutric.use_cases.exceptions.ProfileNotFoundException;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

@Component
public class GetDayUseCase {

    private final DayRepository dayRepository;
    private final ProfileRepository profileRepository;

    public GetDayUseCase(DayRepository dayRepository, ProfileRepository profileRepository) {
        this.dayRepository = dayRepository;
        this.profileRepository = profileRepository;
    }

    public DayData getDay(LocalDate day, UUID userUuid) {
        Optional<DayDbModel> dayOptional = dayRepository.findByDayAndUserUuid(day, userUuid);
        if (dayOptional.isPresent()) {
            return toDayData(dayOptional.get());
        }

        ProfileDbModel profile = profileRepository.findById(userUuid)
                .orElseThrow(() -> new ProfileNotFoundException(userUuid));

        DayDbModel newDay = constructDayDbModel(day, profile);
        dayRepository.save(newDay);
        return toDayData(newDay);
    }

    private DayData toDayData(DayDbModel dayDbModel) {
        return DayData.builder()
                .day(dayDbModel.getDay())
                .userUuid(dayDbModel.getUserUuid())
                .calorieGoal(dayDbModel.getCalorieGoal())
                .carbLimitGrams(dayDbModel.getCarbLimitGrams())
                .proteinLimitGrams(dayDbModel.getProteinLimitGrams())
                .fatLimitGrams(dayDbModel.getFatLimitGrams())
                .build();
    }

    private DayDbModel constructDayDbModel(LocalDate day, ProfileDbModel profile) {
        return DayDbModel.builder()
                .day(day)
                .userUuid(profile.getUserUuid())
                .calorieGoal(profile.getCalorieGoal())
                .carbLimitGrams(profile.getCarbLimitGrams())
                .proteinLimitGrams(profile.getProteinLimitGrams())
                .fatLimitGrams(profile.getFatLimitGrams())
                .build();
    }
}
