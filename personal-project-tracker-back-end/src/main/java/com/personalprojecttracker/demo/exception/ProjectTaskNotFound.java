package com.personalprojecttracker.demo.exception;

public class ProjectTaskNotFound  extends RuntimeException{

    String message;

    public ProjectTaskNotFound(String message) {
        super(message);
        this.message=message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
