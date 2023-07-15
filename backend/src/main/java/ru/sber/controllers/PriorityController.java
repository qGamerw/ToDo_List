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
 * Класс для взаимодействия с приоритетами
 */
@Slf4j
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("priorities")
public class PriorityController {
    private final PriorityService priorityService;

    public PriorityController(PriorityService priorityService) {
        this.priorityService = priorityService;
    }

    @GetMapping
    public ResponseEntity<List<Priority>> getListPriority() {
        log.info("Получает все приоритеты");

        List<Priority> priorityList = priorityService.getPriority();

        return ResponseEntity
                .ok()
                .body(priorityList);
    }
}
