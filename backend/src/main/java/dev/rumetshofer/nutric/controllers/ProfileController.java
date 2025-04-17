package dev.rumetshofer.nutric.controllers;

import dev.rumetshofer.nutric.use_cases.GetProfileUseCase;
import dev.rumetshofer.nutric.use_cases.dto.GetProfileRequestData;
import dev.rumetshofer.nutric.use_cases.dto.ProfileData;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    private final GetProfileUseCase getProfileUseCase;

    public ProfileController(GetProfileUseCase getProfileUseCase) {
        this.getProfileUseCase = getProfileUseCase;
    }

    @GetMapping
    public ProfileData test(
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

}
