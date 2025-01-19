package com.fashionassistant.exceptions;

public record ExceptionResponse(String message, int statusCode, long timeStamp) {
}
