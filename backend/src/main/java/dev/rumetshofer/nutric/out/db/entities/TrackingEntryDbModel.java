package dev.rumetshofer.nutric.out.db.entities;

import dev.rumetshofer.nutric.use_cases.enums.MealType;
import dev.rumetshofer.nutric.use_cases.enums.Unit;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "tracking_entry")
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class TrackingEntryDbModel {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tracking_entry_id_gen")
    @SequenceGenerator(name = "tracking_entry_id_gen", sequenceName = "tracking_entry_id_seq", initialValue = 1000, allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "uuid", nullable = false)
    private UUID uuid;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "day_id", nullable = false)
    private DayDbModel day;

    @Column(name = "meal_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private MealType mealType;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private ProductDbModel product;

    @Column(name = "amount", nullable = false, precision = 10, scale = 3)
    private BigDecimal amount;

    @Column(name = "base_unit", nullable = false)
    @Enumerated(EnumType.STRING)
    private Unit baseUnit;

    @Column(name = "calories_per_base_unit", nullable = false, precision = 10, scale = 3)
    private BigDecimal caloriesPerBaseUnit;

    @Column(name = "carbs_per_base_unit", nullable = false, precision = 10, scale = 3)
    private BigDecimal carbsPerBaseUnit;

    @Column(name = "protein_per_base_unit", nullable = false, precision = 10, scale = 3)
    private BigDecimal proteinPerBaseUnit;

    @Column(name = "fat_per_base_unit", nullable = false, precision = 10, scale = 3)
    private BigDecimal fatPerBaseUnit;

    @Column(name = "tracked_in_base_unit", nullable = false)
    private boolean trackedInBaseUnit;

    @Column(name = "tracked_at", nullable = false)
    private LocalDateTime trackedAt;

}