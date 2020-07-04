package com.personalprojecttracker.demo.service;

import com.personalprojecttracker.demo.dto.TeamProjectRequestDto;
import com.personalprojecttracker.demo.model.TeamProject;

import java.security.Principal;

public interface ITeamProjectService {

    TeamProject addTeamProject (TeamProjectRequestDto teamProjectRequestDto , Principal principal);

    TeamProject getTeamProject(String teamProjectIdentifier,Principal principal);
}
