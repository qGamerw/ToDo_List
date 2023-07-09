package ru.sber.services;

import ru.sber.entities.Category;
import ru.sber.model.LimitCategory;

import java.util.List;
import java.util.Optional;

public interface CategoryService {

    long addCategory(Category category);

    List<LimitCategory> getCategoryById();
}
