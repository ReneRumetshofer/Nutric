package dev.rumetshofer.nutric.use_cases;

import dev.rumetshofer.nutric.out.db.entities.ProductDbModel;
import dev.rumetshofer.nutric.out.db.repositories.ProductRepository;
import dev.rumetshofer.nutric.use_cases.dto.ProductData;
import dev.rumetshofer.nutric.use_cases.dto.in.CreateProductRequest;
import dev.rumetshofer.nutric.use_cases.factories.ProductDataFactory;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.UUID;

@Component
public class CreateProductUseCase {

    private static final BigDecimal ONE_HUNDRED = new BigDecimal("100");

    private final ProductRepository productRepository;
    private final ProductDataFactory productDataFactory;

    public CreateProductUseCase(ProductRepository productRepository, ProductDataFactory productDataFactory) {
        this.productRepository = productRepository;
        this.productDataFactory = productDataFactory;
    }

    public ProductData create(CreateProductRequest request) {
        ProductDbModel productDbModel = constructProductDbModel(request);
        ProductDbModel savedProduct = productRepository.save(productDbModel);
        return productDataFactory.fromProductDbModel(savedProduct);
    }

    private ProductDbModel constructProductDbModel(CreateProductRequest request) {
        return ProductDbModel.builder()
                .uuid(UUID.randomUUID())
                .externalUuid(null)
                .name(request.name())
                .producer(request.producer())
                .servingUnit(request.servingUnit())
                .baseUnitAmount(request.servingSize())
                .baseUnit(request.baseUnit())
                .caloriesPerBaseUnit(convertPerHundredToPerBaseUnit(request.caloriesPerHundred()))
                .carbsPerBaseUnit(convertPerHundredToPerBaseUnit(request.carbsPerHundred()))
                .proteinPerBaseUnit(convertPerHundredToPerBaseUnit(request.proteinPerHundred()))
                .fatPerBaseUnit(convertPerHundredToPerBaseUnit(request.fatPerHundred()))
                .isCustomized(true)
                .build();
    }

    private BigDecimal convertPerHundredToPerBaseUnit(BigDecimal perHundred) {
        return perHundred.divide(ONE_HUNDRED, RoundingMode.HALF_UP);
    }
}
