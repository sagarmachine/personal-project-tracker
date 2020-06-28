package com.personalprojecttracker.demo.exception;

public class ProjectAlreadyExist extends RuntimeException{

    String message;

    public ProjectAlreadyExist(String message) {
        super(message);
        this.message=message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}