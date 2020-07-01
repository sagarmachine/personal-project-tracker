package com.personalprojecttracker.demo.service;

import com.personalprojecttracker.demo.model.ProjectTask;

import java.security.Principal;
import java.util.Set;

public interface IProjectTaskService {

    ProjectTask addProjectTask(String prjectIdentifier, ProjectTask projectTask, Principal principal);
    ProjectTask getProjectByProjectTaskIdentifier(String projectTaskIdentifier,Principal principal);
    Set<ProjectTask> getAllTaskByProjectIdentifier(String projectIdentifier , Principal principal);
     void deleteProjectTaskByprojecttaskIdentifier(String projectTaskIdentifier, Principal principal);
     ProjectTask updateProjectTaskByProjectTaskIdentifier(String projectTaskIdentifier,ProjectTask projectTask,Principal principal);
}
