package com.personalprojecttracker.demo.advice;


import com.personalprojecttracker.demo.exception.*;
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
        return new ResponseEntity(new String []{"Try a different Identifier OR please contact the team"}, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {ProjectNotFoundException.class})
    public ResponseEntity<String> projectNotFoundExceptionHandler(ProjectNotFoundException ex,WebRequest request){
      return  new ResponseEntity(new String[]{ex.getMessage()},HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {UserAlreadyExist.class})
    public ResponseEntity<String> UserAlreadyExistExceptionHandler(UserAlreadyExist ex,WebRequest request){
        return  new ResponseEntity(new String []{ex.getMessage()},HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {ProjectAlreadyExist.class})
    public ResponseEntity<String> projectAlreadyExistHandler(ProjectAlreadyExist ex,WebRequest request){
        return  new ResponseEntity(new String[]{ex.getMessage()},HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(value = {AlreadyAMember.class})
    public ResponseEntity<String> alreadyAMemberExceptionHandler(AlreadyAMember ex,WebRequest request){
        return  new ResponseEntity(new String[]{ex.getMessage()},HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(value = {NotAllowed.class})
    public ResponseEntity<String> NotAllowedExceptionHandler(NotAllowed ex,WebRequest request){
        return  new ResponseEntity(new String[]{ex.getMessage()},HttpStatus.BAD_REQUEST);
    }
}
