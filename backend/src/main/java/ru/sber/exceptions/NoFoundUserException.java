package ru.sber.exceptions;

public class NoFoundUserException extends RuntimeException {
    public NoFoundUserException(String message) {
        super(message);
    }
}