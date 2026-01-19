package dev.rumetshofer.nutric.out.db.repositories;

import dev.rumetshofer.nutric.out.db.entities.ProductDbModel;
import dev.rumetshofer.nutric.out.db.entities.TrackingEntryDbModel;
import dev.rumetshofer.nutric.out.db.projections.ProductIdProjection;
import dev.rumetshofer.nutric.use_cases.enums.MealType;
import org.springframework.data.domain.Limit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TrackingEntryRepository extends JpaRepository<TrackingEntryDbModel, Long> {
    List<TrackingEntryDbModel> findAllByDeletedFalseAndDay_DayAndDay_UserUuid(LocalDate dayDay, UUID dayUserUuid);

    Optional<TrackingEntryDbModel> findByUuid(UUID uuid);

    Optional<TrackingEntryDbModel> findByUuidAndDay_UserUuid(UUID uuid, UUID dayUserUuid);

    Optional<TrackingEntryDbModel> findTopByProductAndDay_UserUuidOrderByTrackedAtDesc(ProductDbModel product, UUID userUuid);

    List<TrackingEntryDbModel> findAllByDay_UserUuidOrderByTrackedAtDesc(UUID dayUserUuid, Limit limit);

    Optional<TrackingEntryDbModel> findFirstByProductIdOrderByTrackedAtDesc(Long productId);

    @Query("""
        SELECT new dev.rumetshofer.nutric.out.db.projections.ProductIdProjection(t.product.id)
        FROM TrackingEntryDbModel t JOIN t.day day
        WHERE day.userUuid = :userUuid
          AND t.trackedAt >= :fromDate
          AND t.mealType = :mealType
          AND t.deleted = false
        GROUP BY t.product.id
        ORDER BY COUNT(t) DESC
        LIMIT :limit
    """)
    List<ProductIdProjection> getFrequentlyUsedProducts(
            @Param("userUuid") UUID userUuid,
            @Param("mealType") MealType mealType,
            @Param("fromDate") LocalDateTime fromDate,
            @Param("limit") int limit
    );
}
