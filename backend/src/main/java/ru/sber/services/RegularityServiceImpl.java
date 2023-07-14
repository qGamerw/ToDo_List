package ru.sber.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.sber.entities.Regularity;
import ru.sber.entities.Status;
import ru.sber.repositories.RegularityRepository;

import java.util.List;

@Slf4j
@Service
public class RegularityServiceImpl implements RegularityService {
    private final RegularityRepository regularityRepository;

    public RegularityServiceImpl(RegularityRepository regularityRepository) {
        this.regularityRepository = regularityRepository;
    }

    @Override
    public List<Regularity> getRegularity() {
        return regularityRepository.findAll();
    }
}
