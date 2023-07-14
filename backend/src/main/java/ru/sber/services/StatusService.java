package ru.sber.services;

import ru.sber.entities.Category;
import ru.sber.entities.Priority;
import ru.sber.entities.Status;
import ru.sber.model.LimitCategory;

import java.util.List;

/**
 * Сервис для взаимодействия со статусами
 */
public interface StatusService {

    /**
     * Получает все статусы
     *
     * @return List<Status>
     */
    List<Status> getStatus();
}
