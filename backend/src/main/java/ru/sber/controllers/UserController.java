package ru.sber.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.sber.entities.User;
import ru.sber.services.UserService;

import java.util.Optional;

/**
 * Класс для взаимодействия пользователем
 */
@Slf4j
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("userses")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable long id) {
        log.info("Выводит данные о пользователе с id {}", id);

        Optional<User> user = userService.getUserById(id);

        if (user.isPresent()) {

            return ResponseEntity
                    .ok()
                    .body(user.get());
        } else {
            return ResponseEntity
                    .notFound()
                    .build();
        }
    }
}
