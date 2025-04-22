package dev.rumetshofer.nutric.use_cases.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

@Getter
@AllArgsConstructor
public enum YazioServing {
    GLASS("glass", Serving.PORTION),
    PACKAGE("package", Serving.PACKAGE),
    MILLILITERS("milliliter", Serving.MILLILITERS),
    GRAMS("gram", Serving.GRAMS),
    PORTION("portion", Serving.PORTION),
    PORTION_LARGE("portion.large", Serving.PORTION),
    PIECE("piece", Serving.PORTION),
    SLICE("slice", Serving.PORTION),
    CAN("can", Serving.PORTION),
    TABLESPOON("tablespoon", Serving.PORTION),
    TEASPOON("teaspoon", Serving.PORTION),
    SANDWICH("sandwich", Serving.PORTION),
    MUG("mug", Serving.PORTION),
    MUG_REGULAR("mug.regular", Serving.PORTION),
    ROLL("roll", Serving.PORTION),
    CANDY("candy", Serving.PORTION),
    EACH("each", Serving.PORTION),
    BOTTLE("bottle", Serving.PORTION),
    BEAKER("beaker", Serving.PORTION),
    CUP("cup", Serving.PORTION),
    SUNDAE("sundae", Serving.PORTION),
    PATTY("patty", Serving.PORTION),
    PLATE("plate", Serving.PORTION),
    PLATE_REGULAR("plate.regular", Serving.PORTION),
    SCOOP("scoop", Serving.PORTION),
    ICE_LOLLY("icelolly", Serving.PORTION),
    ;

    private String value;
    private Serving domainServing;

    public static YazioServing fromValue(String value, YazioServing defaultValue) {
        return Arrays.stream(YazioServing.values())
                .filter(yazioServing -> yazioServing.getValue().equalsIgnoreCase(value))
                .findFirst()
                .orElse(defaultValue);
    }
}
