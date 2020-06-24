package com.personalprojecttracker.demo.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;

import java.util.ArrayList;
import java.util.HashMap;

@Service
@Slf4j
public class BindingResultErrorServiceImp implements IBindingResultErrorService {
    @Override
    public ResponseEntity<?> getErrorResponse(BindingResult result) {
        HashMap hashMap= new HashMap();
        hashMap.put("totalErrors",result.getAllErrors().size());
        ArrayList <HashMap<String, String>>errors= new ArrayList<>();
        for(ObjectError error:result.getFieldErrors()){
            HashMap<String,String> e=new HashMap<>();
            e.put(error.getObjectName(),error.getDefaultMessage());
            errors.add(e);
        }
        hashMap.put("errors",errors);

        return new ResponseEntity<HashMap>(hashMap, HttpStatus.BAD_REQUEST);

    }

}
