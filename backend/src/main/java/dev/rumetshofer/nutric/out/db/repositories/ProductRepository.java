package dev.rumetshofer.nutric.out.db.repositories;

import dev.rumetshofer.nutric.out.db.entities.ProductDbModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<ProductDbModel, Long> {
    Optional<ProductDbModel> findByUuid(UUID uuid);
    Optional<ProductDbModel> findByExternalUuid(UUID externalUuid);
}
