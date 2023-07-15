package ru.sber.model;

import lombok.Data;
import ru.sber.entities.Category;

/**
 * Класс для вывода ограниченной информации о пользователе
 */
@Data
public class LimitCategory {
    private long id;
    private String name;

    public LimitCategory(Category category) {
        this.id = category.getId();
        this.name = category.getName();
    }
}
