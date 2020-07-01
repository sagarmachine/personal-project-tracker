package com.personalprojecttracker.demo.exception;

public class UserAlreadyExist  extends RuntimeException{

    String message;

    public UserAlreadyExist(String message) {
        super(message);
        this.message=message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}