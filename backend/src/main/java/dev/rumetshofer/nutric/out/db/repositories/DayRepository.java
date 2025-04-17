package dev.rumetshofer.nutric.out.db.repositories;

import dev.rumetshofer.nutric.out.db.entities.DayDbModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

public interface DayRepository extends JpaRepository<DayDbModel, Long> {
    Optional<DayDbModel> findByDayAndUserUuid(LocalDate day, UUID userUuid);
}
