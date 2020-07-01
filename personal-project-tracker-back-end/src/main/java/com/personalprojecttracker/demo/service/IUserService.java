package com.personalprojecttracker.demo.service;

import com.personalprojecttracker.demo.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface IUserService extends UserDetailsService {

    ResponseEntity<User> saveUser(User user);

}
