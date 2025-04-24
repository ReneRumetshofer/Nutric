package dev.rumetshofer.nutric.use_cases.factories;

import dev.rumetshofer.nutric.out.db.entities.ProductDbModel;
import dev.rumetshofer.nutric.use_cases.dto.Nutrition;
import dev.rumetshofer.nutric.use_cases.dto.ProductData;
import dev.rumetshofer.nutric.use_cases.dto.Serving;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class ProductDataFactory {

    public ProductData fromProductDbModel(ProductDbModel productDbModel) {
        Serving serving = null;
        if (productDbModel.getBaseUnitAmount() != null && productDbModel.getServingUnit() != null) {
           serving = Serving.builder()
                   .baseUnitAmount(productDbModel.getBaseUnitAmount().doubleValue())
                   .unit(productDbModel.getServingUnit())
                   .build();
        }

        return ProductData.builder()
                .name(productDbModel.getName())
                .producer(productDbModel.getProducer())
                .serving(Optional.ofNullable(serving))
                .baseUnit(productDbModel.getBaseUnit())
                .nutritionPerBaseUnit(Nutrition.builder()
                        .energy(productDbModel.getCaloriesPerBaseUnit().doubleValue())
                        .carbs(productDbModel.getCarbsPerBaseUnit().doubleValue())
                        .protein(productDbModel.getProteinPerBaseUnit().doubleValue())
                        .fat(productDbModel.getFatPerBaseUnit().doubleValue())
                        .build())
                .externalUuid(productDbModel.getExternalUuid())
                .uuid(Optional.ofNullable(productDbModel.getUuid()))
                .isCustomized(productDbModel.getIsCustomized())
                .isExternal(false)
                .build();
    }

}
