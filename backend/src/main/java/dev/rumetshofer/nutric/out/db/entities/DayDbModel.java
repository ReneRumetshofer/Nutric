package dev.rumetshofer.nutric.out.db.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "day")
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class DayDbModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @SequenceGenerator(name = "day_id_seq", sequenceName = "day_id_seq", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "day", nullable = false)
    private LocalDate day;

    @Column(name = "user_uuid", nullable = false)
    private UUID userUuid;

    @Column(name = "calorie_goal", nullable = false)
    private Integer calorieGoal;

    @Column(name = "carb_limit_grams", nullable = false)
    private Integer carbLimitGrams;

    @Column(name = "protein_limit_grams", nullable = false)
    private Integer proteinLimitGrams;

    @Column(name = "fat_limit_grams", nullable = false)
    private Integer fatLimitGrams;

}