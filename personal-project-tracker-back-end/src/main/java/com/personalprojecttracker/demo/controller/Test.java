package com.personalprojecttracker.demo.controller;

import com.personalprojecttracker.demo.security.LoginDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController(value = "/api/test")
public class Test {

    @GetMapping("/")
    public String test(){
        return "test Success";
    }
}
