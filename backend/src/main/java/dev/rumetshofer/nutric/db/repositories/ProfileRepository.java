package dev.rumetshofer.nutric.db.repositories;

import dev.rumetshofer.nutric.db.entities.ProfileDbModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProfileRepository extends JpaRepository<ProfileDbModel, UUID> {
}
