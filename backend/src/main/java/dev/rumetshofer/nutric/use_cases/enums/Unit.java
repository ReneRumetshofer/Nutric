package dev.rumetshofer.nutric.use_cases.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

@Getter
@AllArgsConstructor
public enum Unit {
    GRAMS("g"),
    KILOGRAMS("kg"),
    MILLILITERS("ml"),
    LITERS("l"),
    ;

    private final String abbreviation;

    public static Unit fromAbbreviation(String abbreviation) {
        return Arrays.stream(Unit.values())
                .filter(unit -> unit.getAbbreviation().equalsIgnoreCase(abbreviation))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unknown unit: " + abbreviation));
    }
}
