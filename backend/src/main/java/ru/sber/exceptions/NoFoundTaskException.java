package ru.sber.exceptions;

/**
 * Исключения для несуществующей задачи
 */
public class NoFoundTaskException extends RuntimeException {
    public NoFoundTaskException(String message) {
        super(message);
    }
}
