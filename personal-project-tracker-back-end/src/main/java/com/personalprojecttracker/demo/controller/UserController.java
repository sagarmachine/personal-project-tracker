package com.personalprojecttracker.demo.controller;

import com.personalprojecttracker.demo.model.PayPalClient;
import com.personalprojecttracker.demo.model.User;
import com.personalprojecttracker.demo.repository.UserRepository;
import com.personalprojecttracker.demo.security.JWTUtil;
import com.personalprojecttracker.demo.security.LoginDto;
import com.personalprojecttracker.demo.service.IBindingResultErrorService;
import com.personalprojecttracker.demo.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/user")
@RefreshScope
public class UserController {

    @Autowired
    IBindingResultErrorService bindingResultErrorService;

    @Autowired
    IUserService userService;

    @Autowired
    JWTUtil jwtUtil;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;


    @PostMapping("/register")
    ResponseEntity<?> registerNewUser(@Valid@RequestBody User user, BindingResult bindingResult){
        if(bindingResult.hasErrors())
            return bindingResultErrorService.getErrorResponse(bindingResult);
        if(!user.getPassword().equals(user.getConfirmPassword()))
        return new ResponseEntity<>(new String[]{"password does not match"}, HttpStatus.BAD_REQUEST);


        return    userService.saveUser(user);
    }

    @Autowired
    AuthenticationManager authenticationManager;
    @PostMapping("/login")
    ResponseEntity<?> authenticateUser(@RequestBody @Valid LoginDto loginDto){
         Authentication auth=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));
         if(!auth.isAuthenticated())
             return new ResponseEntity<String>("email or password is invalid",HttpStatus.BAD_REQUEST);

        String jwt=jwtUtil.generateToken(userService.loadUserByUsername(loginDto.getEmail()));
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authentication","bearer "+jwt);
       return new ResponseEntity<>("Authentication Successfull",headers,HttpStatus.ACCEPTED);
    }

    @GetMapping("/")
    List<User> getAllUser(){
         return userRepository.findAll();

    }

    @Autowired
   PayPalClient payPalClient;

    @PostMapping(value = "/make/payment")
    public Map<String, Object> makePayment(@RequestParam("sum") String sum){
        return payPalClient.createPayment(sum);
    }

    @PostMapping(value = "/complete/payment")
    public Map<String, Object> completePayment(HttpServletRequest request){
        return payPalClient.completePayment(request);
    }

}
