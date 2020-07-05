package com.personalprojecttracker.demo.repository;

import com.personalprojecttracker.demo.model.TeamBacklog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamBacklogRepository extends JpaRepository<TeamBacklog,Integer> {

    TeamBacklog findByProjectIdentifier(String projectIdentifier);

}
