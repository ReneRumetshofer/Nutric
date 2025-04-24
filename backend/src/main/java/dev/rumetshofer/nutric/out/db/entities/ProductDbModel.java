package dev.rumetshofer.nutric.out.db.entities;

import dev.rumetshofer.nutric.use_cases.enums.ServingUnit;
import dev.rumetshofer.nutric.use_cases.enums.Unit;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "product")
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class ProductDbModel {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_id_gen")
    @SequenceGenerator(name = "product_id_gen", sequenceName = "product_id_seq", initialValue = 1000, allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "uuid", nullable = false)
    private UUID uuid;

    @Column(name = "external_uuid")
    private UUID externalUuid;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "producer")
    private String producer;

    @Column(name = "serving_unit")
    @Enumerated(EnumType.STRING)
    private ServingUnit servingUnit;

    @Column(name = "base_unit_amount", precision = 10, scale = 3)
    private BigDecimal baseUnitAmount;

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

    @ColumnDefault("false")
    @Column(name = "is_customized", nullable = false)
    private Boolean isCustomized = false;

}