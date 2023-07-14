package ru.sber.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sber.entities.Regularity;
import ru.sber.entities.Status;

/**
 * Репозиторий с повторениями
 */
@Repository
public interface RegularityRepository extends JpaRepository<Regularity, Long> {
}
