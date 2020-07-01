package com.personalprojecttracker.demo.security;

import com.personalprojecttracker.demo.service.IUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@Slf4j
public class SpringWebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    UserNotLoginAuthenticationEntryPoint userNotLoginAuthenticationEntryPoint;

    @Autowired
    JWTUtil jwtUtil;

    @Autowired
    IUserService userService;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/api/v1/user/*","/h2-console/*","/**/*","/actuator/refresh").permitAll()
//                .antMatchers("/**/*","/*").permitAll()
                .anyRequest().authenticated()
                .and().csrf().disable().cors().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
               .and().exceptionHandling().authenticationEntryPoint(userNotLoginAuthenticationEntryPoint)
               .and()//.addFilterAt(getAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .headers().frameOptions().sameOrigin()
        .and().addFilterAfter(getCheckAuthenticationFilter(),UsernamePasswordAuthenticationFilter.class);


    }

    @Bean
    AuthenticationManager getAuthenticationManager(){
        try {
            return authenticationManagerBean();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    CheckAuthenticationFilter getCheckAuthenticationFilter(){
        try {
            return new CheckAuthenticationFilter(authenticationManagerBean(),jwtUtil,userService);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(passwordEncoder);
    }


}
