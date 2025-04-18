package dev.rumetshofer.nutric.use_cases.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

@Getter
@AllArgsConstructor
public enum Serving {
    GLASS("glass"),
    PACKAGE("package"),
    MILLILITER("milliliter"),
    GRAMS("gram"),
    PORTION("portion"),
    PORTION_LARGE("portion.large"),
    PIECE("piece"),
    SLICE("slice"),
    CAN("can"),
    TABLESPOON("tablespoon"),
    TEASPOON("teaspoon"),
    SANDWICH("sandwich"),
    MUG("mug"),
    MUG_REGULAR("mug.regular"),
    ROLL("roll"),
    CANDY("candy"),
    EACH("each"),
    BOTTLE("bottle"),
    BEAKER("beaker"),
    CUP("cup"),
    SUNDAE("sundae"),
    PATTY("patty"),
    PLATE("plate"),
    PLATE_REGULAR("plate.regular"),
    SCOOP("scoop"),
    ICE_LOLLY("icelolly"),
    ;

    private String value;

    public static Serving fromValue(String value) {
        return Arrays.stream(Serving.values())
                .filter(serving -> serving.getValue().equalsIgnoreCase(value))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unknown serving type: " + value));
    }
}
