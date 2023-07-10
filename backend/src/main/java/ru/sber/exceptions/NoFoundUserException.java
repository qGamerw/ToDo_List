package ru.sber.exceptions;

/**
 * Исключения для несуществующего пользователя
 */
public class NoFoundUserException extends RuntimeException {
    public NoFoundUserException(String message) {
        super(message);
    }
}