package dev.rumetshofer.nutric.use_cases.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

@Getter
@AllArgsConstructor
public enum YazioServingUnit {
    GLASS("glass", ServingUnit.GLASS),
    PACKAGE("package", ServingUnit.PACKAGE),
    MILLILITERS("milliliter", ServingUnit.MILLILITERS),
    GRAMS("gram", ServingUnit.GRAMS),
    PORTION("portion", ServingUnit.PORTION),
    PORTION_LARGE("portion.large", ServingUnit.PORTION),
    PIECE("piece", ServingUnit.PIECE),
    SLICE("slice", ServingUnit.PORTION),
    CAN("can", ServingUnit.PORTION),
    TABLESPOON("tablespoon", ServingUnit.TABLESPOON),
    TEASPOON("teaspoon", ServingUnit.TEASPOON),
    SANDWICH("sandwich", ServingUnit.PORTION),
    MUG("mug", ServingUnit.CUP),
    MUG_REGULAR("mug.regular", ServingUnit.CUP),
    ROLL("roll", ServingUnit.PORTION),
    CANDY("candy", ServingUnit.PORTION),
    EACH("each", ServingUnit.PORTION),
    BOTTLE("bottle", ServingUnit.BOTTLE),
    BEAKER("beaker", ServingUnit.PORTION),
    CUP("cup", ServingUnit.CUP),
    SUNDAE("sundae", ServingUnit.PORTION),
    PATTY("patty", ServingUnit.PORTION),
    PLATE("plate", ServingUnit.PORTION),
    PLATE_REGULAR("plate.regular", ServingUnit.PORTION),
    SCOOP("scoop", ServingUnit.PORTION),
    ICE_LOLLY("icelolly", ServingUnit.PORTION),
    ;

    private String value;
    private ServingUnit domainServingUnit;

    public static YazioServingUnit fromValue(String value, YazioServingUnit defaultValue) {
        return Arrays.stream(YazioServingUnit.values())
                .filter(yazioServing -> yazioServing.getValue().equalsIgnoreCase(value))
                .findFirst()
                .orElse(defaultValue);
    }
}
