package ru.sber.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.sber.entities.Priority;
import ru.sber.services.PriorityService;

import java.util.List;

/**
 * Класс для взаимодействия с задачей
 */
@Slf4j
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("priority")
public class PriorityController {
    private final PriorityService priorityService;

    public PriorityController(PriorityService priorityService) {
        this.priorityService = priorityService;
    }

    @GetMapping
    public ResponseEntity<List<Priority>> getListTaskByCategoryId() {
        log.info("Получает все статусы");

        List<Priority> listCategory = priorityService.getPriority();

        return ResponseEntity
                .ok()
                .body(listCategory);
    }
}
