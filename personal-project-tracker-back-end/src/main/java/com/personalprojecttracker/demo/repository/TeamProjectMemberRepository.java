package com.personalprojecttracker.demo.repository;

import com.personalprojecttracker.demo.model.TeamProjectMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamProjectMemberRepository extends JpaRepository <TeamProjectMember,Integer> {

    TeamProjectMember findByUserEmailAndTeamProjectProjectIdentifier(String email,String projectIdentifier);

}
