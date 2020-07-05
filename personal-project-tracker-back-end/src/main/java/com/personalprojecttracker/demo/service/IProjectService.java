package com.personalprojecttracker.demo.service;

import com.personalprojecttracker.demo.model.Project;

import java.security.Principal;

public interface IProjectService {

    Project saveOrUpdateProject(Project project, Principal principal);

    Project getProjectById(String id,Principal principal);

    void deleteProjectById(String id,Principal principal);

    

}
