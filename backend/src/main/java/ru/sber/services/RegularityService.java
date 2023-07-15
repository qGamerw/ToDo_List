package ru.sber.services;

import ru.sber.entities.Regularity;

import java.util.List;

/**
 * Сервис для взаимодействия с повторениями
 */
public interface RegularityService {

    /**
     * Получает все задачи
     *
     * @return List<Regularity>
     */
    List<Regularity> getRegularity();
}
