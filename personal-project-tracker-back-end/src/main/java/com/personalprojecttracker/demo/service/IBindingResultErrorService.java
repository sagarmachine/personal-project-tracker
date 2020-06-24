package com.personalprojecttracker.demo.service;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

public interface IBindingResultErrorService {

    ResponseEntity<?> getErrorResponse(BindingResult result);
}
