package ru.sber.services;

import ru.sber.entities.Status;
import ru.sber.model.LimitTask;
import ru.sber.entities.Task;

import java.util.List;

public interface TaskService {

    long addTask(Task task);

    boolean update(Task task);

    List<LimitTask> getListTaskByCategoryId(long categoryId);

    List<LimitTask> getListTaskByUserId();

    boolean deleteById(long id);

    List<LimitTask> getListTaskByStatusByName(Status status);
}
