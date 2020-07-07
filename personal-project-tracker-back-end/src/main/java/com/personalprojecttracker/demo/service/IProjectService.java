package com.personalprojecttracker.demo.service;

import com.personalprojecttracker.demo.dto.ProjectRequestDto;
import com.personalprojecttracker.demo.model.Project;

import java.security.Principal;

public interface IProjectService {

    Project saveOrUpdateProject(ProjectRequestDto projectRequestDto, Principal principal);

    Project getProjectById(String id,Principal principal);

    void deleteProjectById(String id,Principal principal);

    Project updateProject(ProjectRequestDto projectRequestDto, Principal principal);


}
