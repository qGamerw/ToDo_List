package ru.sber.services;

import ru.sber.entities.Priority;
import ru.sber.entities.Status;

import java.util.List;

/**
 * Сервис для взаимодействия с категориями
 */
public interface PriorityService {

    /**
     * Получает все приоритеты
     *
     * @return List<Priority>
     */
    List<Priority> getPriority();
}
