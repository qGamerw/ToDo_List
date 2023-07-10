package ru.sber.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.sber.entities.Category;

import java.util.List;

/**
 * Репозиторий с категориями
 */
public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findByUserId(long id);

    boolean existsByIdAndUserId(long catalogId, long userId);
}
