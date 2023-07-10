package ru.sber.services;

import ru.sber.entities.Status;
import ru.sber.entities.Task;
import ru.sber.model.LimitTask;

import java.util.List;

/**
 * Сервис для взаимодействия с задачей
 */
public interface TaskService {

    /**
     * Добавляет задачу
     *
     * @param task задача
     * @return id задачи
     */
    long addTask(Task task);

    /**
     * Обновляет задачу
     *
     * @param task задача
     * @return результат
     */
    boolean update(Task task);

    /**
     * Возвращает задачи по id категории
     *
     * @param categoryId id категории
     * @return задачи
     */
    List<LimitTask> getListTaskByCategoryId(long categoryId);

    /**
     * Возвращает все задачи у пользователя
     *
     * @return задачи
     */
    List<LimitTask> getListTaskByUserId();

    /**
     * Удаляет задачу по id
     *
     * @param id if задачи
     * @return результат
     */
    boolean deleteById(long id);

    /**
     * Возвращает задачи по статусу
     *
     * @param status статус
     * @return задачи
     */
    List<LimitTask> getListTaskByStatusByName(Status status);
}
