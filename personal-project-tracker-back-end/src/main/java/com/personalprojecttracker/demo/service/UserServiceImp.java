package com.personalprojecttracker.demo.service;


import com.personalprojecttracker.demo.exception.UserAlreadyExist;
import com.personalprojecttracker.demo.model.User;
import com.personalprojecttracker.demo.repository.UserRepository;
import com.personalprojecttracker.demo.security.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.UUID;

@Service
@Transactional
public class UserServiceImp implements  IUserService{

     @Autowired
    UserRepository userRepository;

     @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    JWTUtil jwtUtil;



    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {

        User user = userRepository.findByEmail(s);
        return  new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(),new ArrayList<>());

    }

    @Override
    public ResponseEntity<User> saveUser(User user) {
        user.setUUID(UUID.randomUUID().toString());
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        try{
            userRepository.save(user);
        }
        catch(Exception ex){
            throw  new UserAlreadyExist("user already exists with email ="+user.getEmail()+"   "+ex.getMessage());
        }
       String jwt= jwtUtil.generateToken(new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(),new ArrayList<>()));

        user.setConfirmPassword("");
        HttpHeaders authentication= new HttpHeaders();
        authentication.add("Authentication","bearer "+jwt);
        return new ResponseEntity<>(user,authentication, HttpStatus.ACCEPTED);
    }
}
