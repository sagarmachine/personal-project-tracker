package com.personalprojecttracker.demo.exception;

public class AlreadyAMember extends RuntimeException{

    String message;

    public AlreadyAMember(String message) {
        super(message);
        this.message=message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}