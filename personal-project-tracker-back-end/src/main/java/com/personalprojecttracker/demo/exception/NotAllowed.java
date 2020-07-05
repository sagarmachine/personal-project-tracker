package com.personalprojecttracker.demo.exception;

public class NotAllowed extends RuntimeException{

    String message;

    public NotAllowed(String message) {
        super(message);
        this.message=message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}