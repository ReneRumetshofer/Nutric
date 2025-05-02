package dev.rumetshofer.nutric.use_cases.factories;

import dev.rumetshofer.nutric.out.db.entities.DayDbModel;
import dev.rumetshofer.nutric.use_cases.dto.DayData;
import org.springframework.stereotype.Component;

@Component
public class DayDataFactory {

    public DayData toDayData(DayDbModel dayDbModel) {
        return DayData.builder()
                .day(dayDbModel.getDay())
                .userUuid(dayDbModel.getUserUuid())
                .calorieGoal(dayDbModel.getCalorieGoal())
                .carbLimitGrams(dayDbModel.getCarbLimitGrams())
                .proteinLimitGrams(dayDbModel.getProteinLimitGrams())
                .fatLimitGrams(dayDbModel.getFatLimitGrams())
                .build();
    }

}
