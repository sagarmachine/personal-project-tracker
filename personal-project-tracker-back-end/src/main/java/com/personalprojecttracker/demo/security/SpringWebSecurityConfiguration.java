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
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;


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
                .antMatchers("/api/v1/user/*","/**/*","/actuator/refresh","/api/test/*").permitAll()
//                .antMatchers("/**/*","/*").permitAll()
                .anyRequest().authenticated()
                .and().csrf().disable()
                //.cors().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
               .and().exceptionHandling().authenticationEntryPoint(userNotLoginAuthenticationEntryPoint)
                .and() .headers().frameOptions().sameOrigin()
               .and().addFilterBefore(getCheckAuthenticationFilter(),UsernamePasswordAuthenticationFilter.class);
 http.cors();

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

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/*").allowedOrigins("*").exposedHeaders("Authentication");
            }
        };
    }
}
