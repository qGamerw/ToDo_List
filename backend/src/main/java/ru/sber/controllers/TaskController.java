package ru.sber.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.sber.entities.Status;
import ru.sber.entities.Task;
import ru.sber.model.LimitTask;
import ru.sber.services.TaskService;

import java.net.URI;
import java.util.List;

/**
 * Класс для взаимодействия с задачей
 */
@Slf4j
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("task")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public ResponseEntity<Long> addTask(@RequestBody Task task) {
        log.info("Создает задачу {}", task);

        return ResponseEntity
                .created(URI.create("task/" + taskService.addTask(task)))
                .build();
    }

    @PutMapping
    public ResponseEntity<List<LimitTask>> updateTask(@RequestBody Task task) {
        log.info("Обновляет задачу по id {}", task.getId());

        var isUpdate = taskService.update(task);

        if (isUpdate) {
            return ResponseEntity
                    .noContent()
                    .build();
        } else {
            return ResponseEntity
                    .notFound()
                    .build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<LimitTask>> getListTaskByCategoryId(@PathVariable long id) {
        log.info("Получает задачи по id категории {}", id);

        List<LimitTask> listCategory = taskService.getListTaskByCategoryId(id);

        return ResponseEntity
                .ok()
                .body(listCategory);
    }

    @GetMapping("/user")
    public ResponseEntity<List<LimitTask>> getListTaskByUserId() {
        log.info("Получает задачи по пользователю");

        List<LimitTask> listCategory = taskService.getListTaskByUserId();

        return ResponseEntity
                .ok()
                .body(listCategory);
    }

    @GetMapping
    public ResponseEntity<List<LimitTask>> getListTaskByStatusName(@RequestBody Status status) {
        log.info("Получает задачи по пользователю");

        List<LimitTask> listTask = taskService.getListTaskByStatusByName(status);

        return ResponseEntity
                .ok()
                .body(listTask);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTaskById(@PathVariable long id) {
        log.info("Удаление задачи id {}", id);

        var isDeleted = taskService.deleteById(id);

        if (isDeleted) {
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
