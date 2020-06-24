package com.personalprojecttracker.demo.advice;


import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class ProjectAdiviceController {

    @ExceptionHandler(value = {DataIntegrityViolationException.class})
    public ResponseEntity<String> dataIntegrationViolationExceptionHandler(DataIntegrityViolationException ex, WebRequest request){
        return new ResponseEntity<>("Data Already Exists", HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {RuntimeException.class})
    public ResponseEntity<String> runtimeExceptionHandler(RuntimeException ex,WebRequest request){
      return  new ResponseEntity<>(ex.getMessage(),HttpStatus.BAD_REQUEST);
    }
}
