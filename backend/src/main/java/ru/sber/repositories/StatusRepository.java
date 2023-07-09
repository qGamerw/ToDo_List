package ru.sber.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.sber.entities.EStatus;
import ru.sber.entities.Status;

public interface StatusRepository extends JpaRepository<Status, Long> {
}
