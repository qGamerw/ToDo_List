package ru.sber.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.sber.entities.Status;

/**
 * Репозиторий со статусами задачи
 */
public interface StatusRepository extends JpaRepository<Status, Long> {
}
