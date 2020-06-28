package com.personalprojecttracker.demo.repository;

import com.personalprojecttracker.demo.model.Backlog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BacklogRepository extends JpaRepository <Backlog,Integer>{

    Backlog findByProjectIdentifier(String projectIdentifier);
}
