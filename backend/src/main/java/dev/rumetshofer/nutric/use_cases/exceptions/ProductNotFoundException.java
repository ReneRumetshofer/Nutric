package dev.rumetshofer.nutric.use_cases.exceptions;

import lombok.Getter;

import java.util.UUID;

@Getter
public class ProductNotFoundException extends RuntimeException {

    private UUID productUuid;

    public ProductNotFoundException(UUID productUuid) {
        super("Product with UUID " + productUuid + " not found");
        this.productUuid = productUuid;
    }

}
