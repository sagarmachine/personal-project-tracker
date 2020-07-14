package com.personalprojecttracker.demo.security;
//
//import com.personalprojecttracker.demo.service.IUserService;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContext;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
//import org.springframework.stereotype.Component;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
//@Component
//@Slf4j
//public class CheckAuthenticationFilter extends OncePerRequestFilter {
//
//    @Autowired
//    JWTUtil jwtUtil;
//
//    @Autowired
//    IUserService userService;
//
//    @Autowired
//    BCryptPasswordEncoder bCryptPasswordEncoder;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
//
//        log.info("1234");
//
//        String authHeader = httpServletRequest.getHeader("Authentication");
//        if(authHeader!=null && authHeader.startsWith("bearer")){
//
//            if(SecurityContextHolder.getContext().getAuthentication()==null){
//                String jwt=authHeader.substring(7);
//                String email=jwtUtil.getUsernameFromToken(jwt);
//                UserDetails user = userService.loadUserByUsername(email);
//              if(jwtUtil.validateToken(jwt,user))
//              {
//
//                  Object principal;
//                  Object credentials;
//                  UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(user,user.getPassword());
////                  token.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
////                  SecurityContextHolder.getContext().setAuthentication(token);
//                  SecurityContextHolder.getContext().setAuthentication(token);
//
//                  log.info("--->"+SecurityContextHolder.getContext().getAuthentication().getName());
//
//              }
//
//            }
//        }
//
//        filterChain.doFilter(httpServletRequest, httpServletResponse);
//
//    }
//}

import com.personalprojecttracker.demo.model.User;
import com.personalprojecttracker.demo.security.JWTUtil;
import com.personalprojecttracker.demo.service.IUserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Enumeration;


@CrossOrigin
@Slf4j

public class CheckAuthenticationFilter  extends OncePerRequestFilter {

    JWTUtil jwtUtil;
    IUserService userService;
//
//    AuthenticationManager authenticationManager;


//    public AuthenticationFilter(JWTUtil jwt){
//        this.jwtUtil=jwt;
//    }


//    public CheckAuthenticationFilter(AuthenticationManager authenticationManager) {
//        super(authenticationManager);
//    }

    public CheckAuthenticationFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil,IUserService userService) {
        // super(authenticationManager);
        this.jwtUtil = jwtUtil;
        this.userService=userService;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {


        String jwtToken = request.getHeader("Authentication");

        Enumeration<String> headerNames = request.getHeaderNames();
        while( headerNames.hasMoreElements())
            log.info("---=-=-=-=-=--> 0 stage "+ headerNames.nextElement());

        try {
            if (jwtToken != null ) {
                log.info("---=-=-=-=-=--> 1 stage");
                String JWT =jwtToken.substring(7);
                UserDetails user =userService.loadUserByUsername(jwtUtil.getUsernameFromToken(JWT));

                if (jwtUtil.validateToken(JWT, user)) {
                    log.info("---=-=-=-=-=--> 2 stage");
                    SecurityContext context = SecurityContextHolder.createEmptyContext();
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken= new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
                    usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    context.setAuthentication(usernamePasswordAuthenticationToken);
                    SecurityContextHolder.setContext(context);
                    log.info("Fine   --------------> "+SecurityContextHolder.getContext().getAuthentication().isAuthenticated());
                }
            }
        }catch(Exception ex) {
            log.info("JWTUtil Excwption -->" + ex);
        }

        filterChain.doFilter(request, response);

    }
}
