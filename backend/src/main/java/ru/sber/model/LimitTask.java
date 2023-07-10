package ru.sber.model;

import lombok.Data;
import ru.sber.entities.Priority;
import ru.sber.entities.Regularity;
import ru.sber.entities.Status;
import ru.sber.entities.Task;

import java.time.LocalDateTime;

/**
 * Класс для вывода ограниченной информации на экран
 */
@Data
public class LimitTask {

    private long id;

    private String title;

    private String description;

    private LocalDateTime deadline;

    private Status status;

    private Priority priority;

    private Regularity regularity;

    public LimitTask(Task task) {
        this.id = task.getId();
        this.title = task.getTitle();
        this.description = task.getDescription();
        this.deadline = task.getDeadline();
        this.status = task.getStatus();
        this.priority = task.getPriority();
        this.regularity = task.getRegularity();
    }
}
