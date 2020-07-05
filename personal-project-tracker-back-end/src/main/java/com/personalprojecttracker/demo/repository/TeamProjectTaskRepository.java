package com.personalprojecttracker.demo.repository;

import com.personalprojecttracker.demo.model.TeamProjectTask;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamProjectTaskRepository extends JpaRepository <TeamProjectTask,Integer> {

    TeamProjectTask findByProjectTaskIdentifier(String projectTaskIdentifier);
}
