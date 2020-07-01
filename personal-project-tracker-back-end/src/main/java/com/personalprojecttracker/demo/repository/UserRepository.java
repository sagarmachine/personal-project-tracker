package com.personalprojecttracker.demo.repository;

import com.personalprojecttracker.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Integer> {

    User findByEmail(String email);
}
