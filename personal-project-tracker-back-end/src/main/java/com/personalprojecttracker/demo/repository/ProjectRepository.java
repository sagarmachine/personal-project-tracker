package com.personalprojecttracker.demo.repository;

import com.personalprojecttracker.demo.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project,Integer> {

    Project findByProjectIdentifier(String id);

    void deleteByProjectIdentifier(String id);
}
