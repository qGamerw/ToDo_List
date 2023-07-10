package ru.sber.services;

import ru.sber.entities.Category;
import ru.sber.model.LimitCategory;

import java.util.List;

/**
 * Сервис для взаимодействия с категориями
 */
public interface CategoryService {

    /**
     * Добавляет категорию
     *
     * @param category категория
     * @return id категория
     */
    long addCategory(Category category);

    /**
     * Возвращает категорию по id
     *
     * @return категория
     */
    List<LimitCategory> getCategoryById();
}
