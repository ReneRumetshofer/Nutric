package dev.rumetshofer.nutric.use_cases.exceptions;

import lombok.Getter;

@Getter
public class AuthorizationException extends RuntimeException {

    public AuthorizationException(String message) {}

}
