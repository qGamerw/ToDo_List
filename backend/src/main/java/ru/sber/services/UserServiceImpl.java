package ru.sber.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.sber.entities.User;
import ru.sber.repositories.UserRepository;

import java.util.Optional;

/**
 * Сервис для взаимодействия с пользователями
 */
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public long addUser(User user) {
        return userRepository.save(user).getId();
    }

    @Override
    public Optional<User> getUserById(long userId) {
        return userRepository.findById(userId);
    }

    @Override
    public boolean existsUserById(long userId) {
        return userRepository.existsById(userId);
    }

    @Override
    public boolean checkUserExistence(long userId) {
        return userRepository.existsById(userId);
    }

    @Override
    @Transactional
    public boolean deleteUserById(long userId) {
        if (checkUserExistence(userId)) {
            userRepository.deleteById(userId);
            return true;
        }
        return false;
    }

    @Override
    public Optional<User> findByLoginAndPassword(String login, String password) {
        return userRepository.findUserByUsernameAndPassword(login, password);
    }
}
