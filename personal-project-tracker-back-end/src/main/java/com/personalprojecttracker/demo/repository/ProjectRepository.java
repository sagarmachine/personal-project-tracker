package com.personalprojecttracker.demo.repository;

import com.personalprojecttracker.demo.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project,Integer> {

    Project findByProjectIdentifier(String id);

    void deleteByProjectIdentifier(String id);
    List<Project> findByUserEmailOrderByCreatedDateDesc(String email);


}
