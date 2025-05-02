package dev.rumetshofer.nutric.controllers;

import dev.rumetshofer.nutric.use_cases.GetProfileUseCase;
import dev.rumetshofer.nutric.use_cases.UpdateProfileUseCase;
import dev.rumetshofer.nutric.use_cases.dto.in.GetProfileRequestData;
import dev.rumetshofer.nutric.use_cases.dto.ProfileData;
import dev.rumetshofer.nutric.use_cases.dto.in.UpdateProfileRequest;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    private final GetProfileUseCase getProfileUseCase;
    private final UpdateProfileUseCase updateProfileUseCase;

    public ProfileController(GetProfileUseCase getProfileUseCase, UpdateProfileUseCase updateProfileUseCase) {
        this.getProfileUseCase = getProfileUseCase;
        this.updateProfileUseCase = updateProfileUseCase;
    }

    @GetMapping
    public ProfileData getProfile(
            @RequestAttribute("userUuid") UUID userUuid,
            @RequestAttribute("userFirstName") String firstName,
            @RequestAttribute("userLastName") String lastName,
            @RequestAttribute("userEmail") String email
    ) {
        GetProfileRequestData requestData = GetProfileRequestData.builder()
                .userUuid(userUuid)
                .firstName(firstName)
                .lastName(lastName)
                .email(email)
                .build();
        return getProfileUseCase.getProfile(requestData);
    }

    @PutMapping
    public void updateProfile(
            @RequestAttribute("userUuid") UUID userUuid,
            @RequestBody UpdateProfileRequest updateProfileRequest
    ) {
        updateProfileUseCase.update(userUuid, updateProfileRequest);
    }

}
