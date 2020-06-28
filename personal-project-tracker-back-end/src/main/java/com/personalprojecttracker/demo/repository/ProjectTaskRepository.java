package com.personalprojecttracker.demo.repository;

import com.personalprojecttracker.demo.model.ProjectTask;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectTaskRepository extends JpaRepository<ProjectTask,Integer> {

    ProjectTask findByProjectTaskIdentifier(String projectTaskIdentifier);
}
