package dev.rumetshofer.nutric.controllers;

import dev.rumetshofer.nutric.use_cases.CreateProductUseCase;
import dev.rumetshofer.nutric.use_cases.dto.ProductData;
import dev.rumetshofer.nutric.use_cases.dto.in.CreateProductRequest;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/products")
@AllArgsConstructor
public class ProductController {

    private final CreateProductUseCase createProductUseCase;

    @PostMapping
    public ProductData createProduct(
            @RequestBody CreateProductRequest request
    ) {
        return createProductUseCase.create(request);
    }
}
