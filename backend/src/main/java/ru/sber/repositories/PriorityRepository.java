package ru.sber.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sber.entities.Priority;
import ru.sber.entities.Status;

/**
 * Репозиторий с приоритетами
 */
@Repository
public interface PriorityRepository extends JpaRepository<Priority, Long> {
}
