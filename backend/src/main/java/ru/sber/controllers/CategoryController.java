package ru.sber.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.sber.entities.Category;
import ru.sber.model.LimitCategory;
import ru.sber.services.CategoryService;

import java.net.URI;
import java.util.List;

/**
 * Класс для взаимодействия с категорией
 */
@Slf4j
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("categories")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    public ResponseEntity<Long> addCategory(@RequestBody Category category) {
        log.info("Создает категорию {}", category.getName());

        return ResponseEntity
                .created(URI.create("category/" + categoryService.addCategory(category)))
                .build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<LimitCategory>> getCategoryByUserId() {
        log.info("Получает категории по id пользователя");

        List<LimitCategory> category = categoryService.getCategoryById();

        return ResponseEntity
                .ok()
                .body(category);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LimitCategory> getCategoryById(@PathVariable long id) {
        log.info("Получает категории по id");

        LimitCategory category = categoryService.getCategoryById(id);

        return ResponseEntity
                .ok()
                .body(category);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategoryById(@PathVariable long id) {
        log.info("Удаляет категорию по id");

        boolean isCategory = categoryService.deleteCategoryById(id);

        if (isCategory) {
            return ResponseEntity
                    .noContent()
                    .build();
        } else {
            return ResponseEntity
                    .notFound()
                    .build();
        }
    }
}
