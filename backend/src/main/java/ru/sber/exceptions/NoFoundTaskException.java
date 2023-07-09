package ru.sber.exceptions;

public class NoFoundTaskException extends RuntimeException{
    public NoFoundTaskException(String message) {
        super(message);
    }
}
