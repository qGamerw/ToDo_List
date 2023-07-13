package ru.sber.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.sber.entities.Task;

import java.util.List;

/**
 * Репозиторий с задачами
 */
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByCategoryId(long id);

    List<Task> findByCategoryUserId(long id);

    boolean existsByCategoryUserIdAndId(long userId, long id);

    List<Task> findByCategoryUser_IdAndStatus_Id(long userId, long statusId);

    void deleteAllByCategoryId(long id);

    List<Task> findByCategoryNameAndCategory_User_Id(String categoryName, long statusId);
}
