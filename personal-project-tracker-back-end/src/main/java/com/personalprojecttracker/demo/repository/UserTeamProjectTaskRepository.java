package com.personalprojecttracker.demo.repository;

import com.personalprojecttracker.demo.model.UserTeamProjectTask;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTeamProjectTaskRepository extends JpaRepository <UserTeamProjectTask ,Integer> {

    UserTeamProjectTask findByUserEmailAndTeamProjectTaskProjectTaskIdentifier(String email, String  projectTaskIdetifier);
}
