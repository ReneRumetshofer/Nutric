package dev.rumetshofer.nutric.use_cases;

import dev.rumetshofer.nutric.out.db.entities.ProfileDbModel;
import dev.rumetshofer.nutric.out.db.repositories.ProfileRepository;
import dev.rumetshofer.nutric.use_cases.dto.in.UpdateProfileRequest;
import dev.rumetshofer.nutric.use_cases.exceptions.ProfileNotFoundException;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class UpdateProfileUseCase {

    private final ProfileRepository profileRepository;

    public UpdateProfileUseCase(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    public void update(UUID userUuid, UpdateProfileRequest updateProfileRequest) {
        ProfileDbModel foundProfileDbModel = profileRepository.findById(userUuid)
                .orElseThrow(() -> new ProfileNotFoundException(userUuid));

        foundProfileDbModel.setWeight(updateProfileRequest.weight());
        foundProfileDbModel.setCalorieGoal(updateProfileRequest.calorieGoal());
        foundProfileDbModel.setCarbLimitGrams(updateProfileRequest.carbLimitGrams());
        foundProfileDbModel.setProteinLimitGrams(updateProfileRequest.proteinLimitGrams());
        foundProfileDbModel.setFatLimitGrams(updateProfileRequest.fatLimitGrams());
        profileRepository.save(foundProfileDbModel);
    }

}
