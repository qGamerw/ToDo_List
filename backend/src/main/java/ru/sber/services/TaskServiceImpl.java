package ru.sber.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ru.sber.entities.Status;
import ru.sber.exceptions.NoFoundCategoryException;
import ru.sber.exceptions.NoFoundUserException;
import ru.sber.model.LimitTask;
import ru.sber.entities.Task;
import ru.sber.repositories.CategoryRepository;
import ru.sber.repositories.TaskRepository;
import ru.sber.security.services.UserDetailsImpl;

import java.util.List;

@Slf4j
@Service
public class TaskServiceImpl implements TaskService{

    private final TaskRepository taskRepository;
    private final CategoryRepository categoryRepository;

    public TaskServiceImpl(TaskRepository taskRepository, CategoryRepository categoryRepository) {
        this.taskRepository = taskRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public long addTask(Task task) {
        if (categoryRepository.existsByIdAndUserId(task.getCategory().getId(), getUserId())){
            return taskRepository.save(task).getId();

        } else {
            throw new NoFoundCategoryException("Категория не найдена");
        }
    }

    @Override
    public boolean update(Task task) {
        if (taskRepository.existsByCategoryUserIdAndId(getUserId(), task.getId())){
            log.info("dsf");
            taskRepository.save(task);

            return true;
        }
        log.info("dfggdfgdfg");
        return false;
    }

    @Override
    public List<LimitTask> getListTaskByCategoryId(long categoryId) {
        if (categoryRepository.existsByIdAndUserId(categoryId, getUserId())){

            return taskRepository.findByCategoryId(categoryId).stream().map(LimitTask::new).toList();
        } else {
            throw new NoFoundCategoryException("Категория не найдена");
        }
    }

    @Override
    public List<LimitTask> getListTaskByUserId() {

        return taskRepository.findByCategoryUserId(getUserId()).stream().map(LimitTask::new).toList();
    }

    private long getUserId(){
        var user = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (user instanceof UserDetailsImpl){
            return ((UserDetailsImpl) user).getId();
        } else {
            throw new NoFoundUserException("Пользователь не найден");
        }
    }

    @Override
    public boolean deleteById(long id) {
        if (taskRepository.existsByCategoryUserIdAndId(getUserId(), id)){
            taskRepository.deleteById(id);

            return true;
        }
        return false;
    }

    @Override
    public List<LimitTask> getListTaskByStatusByName(Status status) {
        return taskRepository.findByCategoryUser_IdAndStatus_Id(getUserId(), status.getId())
                .stream()
                .map(LimitTask::new)
                .toList();
    }
}
