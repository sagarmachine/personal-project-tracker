package com.personalprojecttracker.demo.service;

import com.personalprojecttracker.demo.model.Project;

public interface IProjectService {

    Project saveOrUpdateProject(Project project);

    Project getProjectById(String id);

    void deleteProjectById(String id);


}
