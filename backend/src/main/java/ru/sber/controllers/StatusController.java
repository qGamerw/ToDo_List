package ru.sber.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.sber.entities.Status;
import ru.sber.entities.Task;
import ru.sber.model.LimitTask;
import ru.sber.services.StatusService;
import ru.sber.services.TaskService;

import java.net.URI;
import java.util.List;

/**
 * Класс для взаимодействия со статусом
 */
@Slf4j
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("statuses")
public class StatusController {
    private final StatusService statusService;

    public StatusController(StatusService statusService) {
        this.statusService = statusService;
    }

    @GetMapping
    public ResponseEntity<List<Status>> getListStatus() {
        log.info("Получает все статусы" );

        List<Status> statusList = statusService.getStatus();

        return ResponseEntity
                .ok()
                .body(statusList);
    }


}
