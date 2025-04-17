package dev.rumetshofer.nutric.out.db.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "profile")
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDbModel {
    @Id
    @Column(name = "user_uuid", nullable = false)
    private UUID userUuid;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "calorie_goal", nullable = false)
    private Integer calorieGoal;

    @Column(name = "weight", nullable = false, precision = 7, scale = 2)
    private BigDecimal weight;

    @Column(name = "carb_limit_grams", nullable = false)
    private Integer carbLimitGrams;

    @Column(name = "protein_limit_grams", nullable = false)
    private Integer proteinLimitGrams;

    @Column(name = "fat_limit_grams", nullable = false)
    private Integer fatLimitGrams;

}