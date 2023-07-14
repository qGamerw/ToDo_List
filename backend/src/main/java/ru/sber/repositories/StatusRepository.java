package ru.sber.repositories;

import jdk.jfr.Registered;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sber.entities.Category;
import ru.sber.entities.Status;

import java.util.List;

/**
 * Репозиторий со статусом
 */
@Repository
public interface StatusRepository extends JpaRepository<Status, Long> {
}
