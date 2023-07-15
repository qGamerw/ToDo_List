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
     * Возвращает категории по id пользователя
     *
     * @return категории
     */
    List<LimitCategory> getCategoryById();

    /**
     * Возвращает категорию по id
     *
     * @param id id категории
     * @return категория
     */
    LimitCategory getCategoryById(long id);

    /**
     * Удаляет категорию по id
     *
     * @param id id категории
     * @return категория
     */
    boolean deleteCategoryById(long id);
}
