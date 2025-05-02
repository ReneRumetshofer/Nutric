package dev.rumetshofer.nutric.use_cases;

import dev.rumetshofer.nutric.out.db.entities.DayDbModel;
import dev.rumetshofer.nutric.out.db.entities.ProfileDbModel;
import dev.rumetshofer.nutric.out.db.repositories.DayRepository;
import dev.rumetshofer.nutric.out.db.repositories.ProfileRepository;
import dev.rumetshofer.nutric.use_cases.dto.in.UpdateProfileRequest;
import dev.rumetshofer.nutric.use_cases.exceptions.ProfileNotFoundException;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.UUID;

@Component
public class UpdateProfileUseCase {

    private final ProfileRepository profileRepository;
    private final DayRepository dayRepository;

    public UpdateProfileUseCase(ProfileRepository profileRepository, DayRepository dayRepository) {
        this.profileRepository = profileRepository;
        this.dayRepository = dayRepository;
    }

    public void update(UUID userUuid, UpdateProfileRequest updateProfileRequest) {
        ProfileDbModel foundProfileDbModel = profileRepository.findById(userUuid)
                .orElseThrow(() -> new ProfileNotFoundException(userUuid));

        updateProfile(foundProfileDbModel, updateProfileRequest);

        dayRepository.findByDayAndUserUuid(LocalDate.now(), userUuid).ifPresent(dayDbModel ->
            updateCurrentDay(dayDbModel, updateProfileRequest)
        );
    }

    private void updateProfile(ProfileDbModel profileDbModel, UpdateProfileRequest updateProfileRequest) {
        profileDbModel.setWeight(updateProfileRequest.weight());
        profileDbModel.setCalorieGoal(updateProfileRequest.calorieGoal());
        profileDbModel.setCarbLimitGrams(updateProfileRequest.carbLimitGrams());
        profileDbModel.setProteinLimitGrams(updateProfileRequest.proteinLimitGrams());
        profileDbModel.setFatLimitGrams(updateProfileRequest.fatLimitGrams());

        profileRepository.save(profileDbModel);
    }

    private void updateCurrentDay(DayDbModel dayDbModel, UpdateProfileRequest updateProfileRequest) {
        dayDbModel.setCalorieGoal(updateProfileRequest.calorieGoal());
        dayDbModel.setCarbLimitGrams(updateProfileRequest.carbLimitGrams());
        dayDbModel.setProteinLimitGrams(updateProfileRequest.proteinLimitGrams());
        dayDbModel.setFatLimitGrams(updateProfileRequest.fatLimitGrams());

        dayRepository.save(dayDbModel);
    }

}
