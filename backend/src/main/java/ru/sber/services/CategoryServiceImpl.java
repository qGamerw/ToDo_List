package ru.sber.services;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ru.sber.entities.Category;
import ru.sber.entities.User;
import ru.sber.exceptions.NoFoundUserException;
import ru.sber.model.LimitCategory;
import ru.sber.repositories.CategoryRepository;
import ru.sber.repositories.TaskRepository;
import ru.sber.security.services.UserDetailsImpl;

import java.util.List;

@Slf4j
@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final TaskRepository taskRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository, TaskRepository taskRepository) {
        this.categoryRepository = categoryRepository;
        this.taskRepository = taskRepository;
    }

    @Override
    public long addCategory(Category category) {
        log.info("Создает категорию с именем {}", category.getName());

        var user = new User();
        user.setId(getUserId());
        category.setUser(user);

        return categoryRepository.save(category).getId();
    }

    @Override
    public List<LimitCategory> getCategoryById() {
        return categoryRepository.findByUserId(getUserId())
                .stream()
                .map(LimitCategory::new)
                .toList();
    }

    @Override
    public LimitCategory getCategoryById(long id) {
        return new LimitCategory(categoryRepository.findById(id));
    }

    @Transactional
    @Override
    public boolean deleteCategoryById(long id) {
        log.info("Удаляет все задачи в категории и категорию по id {}", id);

        taskRepository.deleteAllByCategoryId(id);
        categoryRepository.deleteById(id);

        return true;
    }

    private long getUserId() {
        var user = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (user instanceof UserDetailsImpl) {
            return ((UserDetailsImpl) user).getId();
        } else {
            throw new NoFoundUserException("Пользователь не найден");
        }
    }
}
