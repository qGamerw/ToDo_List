package ru.sber.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import ru.sber.entities.Priority;
import ru.sber.entities.Regularity;
import ru.sber.entities.Status;
import ru.sber.entities.Task;

import java.time.LocalDateTime;

/**
 * Класс для вывода информации о категориях
 */
@Data
public class LimitTask {

    private long id;

    private String title;

    private String description;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime deadline;

    private Status status;

    private Priority priority;

    private Regularity regularity;

    private LimitCategory limitCategory;

    public LimitTask(Task task) {
        this.id = task.getId();
        this.title = task.getTitle();
        this.description = task.getDescription();
        this.deadline = task.getDeadline();
        this.status = task.getStatus();
        this.priority = task.getPriority();
        this.regularity = task.getRegularity();
        this.limitCategory = new LimitCategory(task.getCategory());
    }
}
