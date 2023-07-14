package ru.sber.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.sber.entities.Regularity;
import ru.sber.entities.Status;
import ru.sber.services.RegularityService;
import ru.sber.services.StatusService;

import javax.imageio.spi.RegisterableService;
import java.util.List;

/**
 * Класс для взаимодействия с повторениями
 */
@Slf4j
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("regularities")
public class RegularityController {
    private final RegularityService regularityService;

    public RegularityController(RegularityService regularityService) {
        this.regularityService = regularityService;
    }

    @GetMapping
    public ResponseEntity<List<Regularity>> getListRegularity() {
        log.info("Получает все повторения" );

        List<Regularity> regularityList = regularityService.getRegularity();

        return ResponseEntity
                .ok()
                .body(regularityList);
    }


}
