package ru.sber.exceptions;

public class NoFoundCategoryException extends RuntimeException {
    public NoFoundCategoryException(String message) {
        super(message);
    }
}