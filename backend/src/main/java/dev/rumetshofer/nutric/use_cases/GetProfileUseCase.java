package dev.rumetshofer.nutric.use_cases;

import dev.rumetshofer.nutric.out.db.entities.ProfileDbModel;
import dev.rumetshofer.nutric.out.db.repositories.ProfileRepository;
import dev.rumetshofer.nutric.use_cases.dto.GetProfileRequestData;
import dev.rumetshofer.nutric.use_cases.dto.ProfileData;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Optional;

@Component
public class GetProfileUseCase {

    private final ProfileRepository profileRepository;

    public GetProfileUseCase(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    public ProfileData getProfile(GetProfileRequestData getProfileRequestData) {
        Optional<ProfileDbModel> profileOptional = profileRepository.findById(getProfileRequestData.userUuid());
        if (profileOptional.isPresent()) {
            return toProfileData(profileOptional.get());
        }

        ProfileDbModel newProfile = profileRepository.save(constructProfile(getProfileRequestData));
        return toProfileData(newProfile);
    }

    private ProfileData toProfileData(ProfileDbModel profileDbModel) {
        return ProfileData.builder()
                .userUuid(profileDbModel.getUserUuid())
                .firstName(profileDbModel.getFirstName())
                .lastName(profileDbModel.getLastName())
                .email(profileDbModel.getEmail())
                .calorieGoal(profileDbModel.getCalorieGoal())
                .weight(profileDbModel.getWeight())
                .carbLimitGrams(profileDbModel.getCarbLimitGrams())
                .proteinLimitGrams(profileDbModel.getProteinLimitGrams())
                .fatLimitGrams(profileDbModel.getFatLimitGrams())
                .build();
    }

    private ProfileDbModel constructProfile(GetProfileRequestData getProfileRequestData) {
        return ProfileDbModel.builder()
                .userUuid(getProfileRequestData.userUuid())
                .firstName(getProfileRequestData.firstName())
                .lastName(getProfileRequestData.lastName())
                .email(getProfileRequestData.email())
                .calorieGoal(2000)
                .weight(BigDecimal.valueOf(80))
                .carbLimitGrams(200)
                .proteinLimitGrams(150)
                .fatLimitGrams(70)
                .build();
    }

}
