package ru.sber.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ru.sber.entities.Category;
import ru.sber.entities.Status;
import ru.sber.entities.User;
import ru.sber.exceptions.NoFoundUserException;
import ru.sber.model.LimitCategory;
import ru.sber.repositories.CategoryRepository;
import ru.sber.repositories.StatusRepository;
import ru.sber.security.services.UserDetailsImpl;

import java.util.List;

@Slf4j
@Service
public class StatusServiceImpl implements StatusService {
    private final StatusRepository statusRepository;

    public StatusServiceImpl(StatusRepository statusRepository) {
        this.statusRepository = statusRepository;
    }

    @Override
    public List<Status> getStatus() {
        return statusRepository.findAll();
    }
}
