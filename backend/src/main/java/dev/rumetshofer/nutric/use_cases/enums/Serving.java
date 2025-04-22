package dev.rumetshofer.nutric.use_cases.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Serving {
    PACKAGE("package"),
    MILLILITERS("milliliter"),
    GRAMS("gram"),
    PORTION("portion"),
    ;

    private String value;
}
