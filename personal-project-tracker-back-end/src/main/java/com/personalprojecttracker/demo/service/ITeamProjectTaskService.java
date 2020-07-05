package com.personalprojecttracker.demo.service;

import com.personalprojecttracker.demo.dto.TeamProjectTasKRequestDto;
import com.personalprojecttracker.demo.model.TeamProject;
import com.personalprojecttracker.demo.model.TeamProjectTask;

import java.security.Principal;

public interface ITeamProjectTaskService {

    TeamProjectTask addMyTeamProjectTask(TeamProjectTasKRequestDto teamProjectTasKRequestDto,String teamProjectIdentifier , Principal principal);

    TeamProjectTask updateTeamProjectTask(TeamProjectTasKRequestDto teamProjectTasKRequestDto,
                                          String projectTaskIdetifier,Principal principal);

    TeamProjectTask addMeToExistingTeamProjectTask(String teamProjectTaskIdentifier,Principal principal);


    TeamProjectTask addMembersToExistingTeamProjectTask(String teamProjectTaskIdentifier,Principal principal,String []membersEmail);

    void removeMeFromExistingTeamProjectTask(String projectTaskIdentifier,Principal principal);
}
