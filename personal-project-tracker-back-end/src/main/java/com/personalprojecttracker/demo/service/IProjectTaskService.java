package com.personalprojecttracker.demo.service;

import com.personalprojecttracker.demo.dto.ProjectTaskRequestDto;
import com.personalprojecttracker.demo.model.ProjectTask;

import java.security.Principal;
import java.util.List;
import java.util.Set;

public interface IProjectTaskService {

    ProjectTask addProjectTask(String prjectIdentifier, ProjectTaskRequestDto projectTaskRequestDto, Principal principal);
    ProjectTask getProjectByProjectTaskIdentifier(String projectTaskIdentifier,Principal principal);
    List<ProjectTask> getAllTaskByProjectIdentifier(String projectIdentifier , Principal principal);
     void deleteProjectTaskByprojecttaskIdentifier(String projectTaskIdentifier, Principal principal);
     ProjectTask updateProjectTaskByProjectTaskIdentifier(String projectTaskIdentifier,ProjectTaskRequestDto projectTaskRequestDto,Principal principal);
}
