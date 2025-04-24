package dev.rumetshofer.nutric.out.db.repositories;

import dev.rumetshofer.nutric.out.db.entities.TrackingEntryDbModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface TrackingEntryRepository extends JpaRepository<TrackingEntryDbModel, Long> {
    List<TrackingEntryDbModel> findAllByDay_Day(LocalDate dayDay);
}
