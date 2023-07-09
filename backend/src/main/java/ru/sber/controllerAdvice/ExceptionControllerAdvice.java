package ru.sber.controllerAdvice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ru.sber.model.ErrorDetails;

import java.util.HashMap;
import java.util.Map;

/**
 * Контроллер для перехвата исключений
 */
//@RestControllerAdvice
//public class ExceptionControllerAdvice {
//
//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    @ExceptionHandler(RuntimeException.class)
//    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
//        Map<String, String> errors = new HashMap<>();
//        ex.getBindingResult().getAllErrors().forEach((error) -> {
//            String fieldName = ((FieldError) error).getField();
//            String errorMessage = error.getDefaultMessage();
//            errors.put(fieldName, errorMessage);
//        });
//        return errors;
//    }
//
//}

@RestControllerAdvice
public class ExceptionControllerAdvice {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorDetails> exceptionRuntimeHandler(RuntimeException exception) {
        ErrorDetails errorDetails = new ErrorDetails();
        errorDetails.setMessage(exception.getMessage());

        return ResponseEntity
                .badRequest()
                .body(errorDetails);
    }
}
