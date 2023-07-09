package ru.sber.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ru.sber.entities.Category;
import ru.sber.entities.User;
import ru.sber.exceptions.NoFoundUserException;
import ru.sber.model.LimitCategory;
import ru.sber.repositories.CategoryRepository;
import ru.sber.security.services.UserDetailsImpl;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
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

    private long getUserId(){
        var user = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (user instanceof UserDetailsImpl){
            return ((UserDetailsImpl) user).getId();
        } else {
            throw new NoFoundUserException("Пользователь не найден");
        }
    }
}
