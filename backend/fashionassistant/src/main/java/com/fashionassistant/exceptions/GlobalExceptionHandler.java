package com.fashionassistant.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {
    private final Map<Class<? extends RuntimeException>, HttpStatus> exceptionTypes;

    public GlobalExceptionHandler() {
        exceptionTypes = Map.of(
                NotFoundException.class, HttpStatus.NOT_FOUND,
                BadRequestException.class, HttpStatus.BAD_REQUEST,
                AccessDeniedException.class, HttpStatus.UNAUTHORIZED
        );
    }

    @ExceptionHandler(value = {NotFoundException.class, BadRequestException.class, AccessDeniedException.class})
    public ResponseEntity<Object> handleException(RuntimeException exc) {
        HttpStatus status = exceptionTypes.get(exc.getClass());
        if (status != null) {
            ExceptionResponse response = new ExceptionResponse(
                    exc.getMessage(),
                    status.value(),
                    System.currentTimeMillis()
            );
            return new ResponseEntity<>(response, status);
        }
        ExceptionResponse response = new ExceptionResponse(
                exc.getMessage(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                System.currentTimeMillis()
        );
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
