package ru.sber.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.sber.entities.Priority;
import ru.sber.entities.Status;
import ru.sber.repositories.PriorityRepository;
import ru.sber.repositories.StatusRepository;

import java.util.List;

@Slf4j
@Service
public class PriorityServiceImpl implements PriorityService {
    private final PriorityRepository priorityRepository;

    public PriorityServiceImpl(PriorityRepository priorityRepository) {
        this.priorityRepository = priorityRepository;
    }

    @Override
    public List<Priority> getPriority() {
        return priorityRepository.findAll();
    }
}
