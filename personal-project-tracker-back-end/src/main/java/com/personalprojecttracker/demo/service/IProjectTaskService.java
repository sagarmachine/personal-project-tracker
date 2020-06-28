package com.personalprojecttracker.demo.service;

import com.personalprojecttracker.demo.model.ProjectTask;

import java.util.Set;

public interface IProjectTaskService {

    ProjectTask addProjectTask(String prjectIdentifier,ProjectTask projectTask);
    ProjectTask getProjectByProjectTaskIdentifier(String projectTaskIdentifier);
    Set<ProjectTask> getAllTaskByProjectIdentifier(String projectIdentifier);
     void deleteProjectTaskByprojecttaskIdentifier(String projectTaskIdentifier);
     ProjectTask updateProjectTaskByProjectTaskIdentifier(String projectTaskIdentifier,ProjectTask projectTask);
}
