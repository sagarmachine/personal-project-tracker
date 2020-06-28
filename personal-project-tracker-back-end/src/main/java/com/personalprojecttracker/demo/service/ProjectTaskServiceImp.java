package com.personalprojecttracker.demo.service;

import com.personalprojecttracker.demo.exception.ProjectNotFoundException;
import com.personalprojecttracker.demo.model.Backlog;
import com.personalprojecttracker.demo.model.ProjectTask;
import com.personalprojecttracker.demo.repository.BacklogRepository;
import com.personalprojecttracker.demo.repository.ProjectTaskRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;


@Service
@Transactional
@Slf4j
 public class ProjectTaskServiceImp implements IProjectTaskService{

    @Autowired
    BacklogRepository backlogRepository;

    @Autowired
    ProjectTaskRepository projectTaskRepository;

    @Override
    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
        if(backlog==null)
            throw  new ProjectNotFoundException("no project found with projectIdentifier=\""+projectIdentifier+"\"");
       // projectTask.setProjectTaskIdentifier(projectTask.getProjectTaskIdentifier().toUpperCase());
        backlog.setProjectTaskSequence(backlog.getProjectTaskSequence()+1);
        projectTask.setProjectTaskIdentifier(projectIdentifier.toUpperCase()+"-"+backlog.getProjectTaskSequence());
        projectTask.setStatus("TO_DO");
        projectTask.setBacklog(backlog);
        backlog.addProjectTask(projectTask);
        backlogRepository.save(backlog);
        return projectTask;
    }

    @Override
    public ProjectTask getProjectByProjectTaskIdentifier(String projectTaskIdentifier) {

      ProjectTask projectIdentifier = projectTaskRepository.findByProjectTaskIdentifier( projectTaskIdentifier.toUpperCase());
        if(projectIdentifier==null)
            throw  new ProjectNotFoundException("no project task found with projectTaskIdentifier=\""+projectTaskIdentifier.toUpperCase()+"\"");
        return projectIdentifier;
    }

    @Override
    public Set<ProjectTask> getAllTaskByProjectIdentifier(String projectIdentifier) {
        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
        if(backlog==null)
            throw  new ProjectNotFoundException("no project found with projectIdentifier=\""+projectIdentifier.toUpperCase()+"\"");
return backlog.getProjectTasks();
    }

    @Override
    public void deleteProjectTaskByprojecttaskIdentifier(String projectTaskIdentifier) {
        ProjectTask projectTask = projectTaskRepository.findByProjectTaskIdentifier( projectTaskIdentifier.toUpperCase());
        if(projectTask==null)
            throw  new ProjectNotFoundException("no project task found with projectTaskIdentifier=\""+projectTaskIdentifier+"\"");
        log.info("DELETING------>"+projectTask.getProjectTaskIdentifier());
        projectTaskRepository.delete(projectTask);
    }

    @Override
    public ProjectTask updateProjectTaskByProjectTaskIdentifier(String projectTaskIdentifier, ProjectTask projectTask) {
        if(projectTask.getId()==0 && !projectTaskRepository.findById(projectTask.getId()).isPresent())
            throw  new ProjectNotFoundException("no project task found with project id=\""+projectTask.getId()+"\"");

        ProjectTask projectTaskTemp=projectTaskRepository.findById(projectTask.getId()).get();
        projectTask.setBacklog(projectTaskTemp.getBacklog());
        projectTask.setCreatedDate(projectTaskTemp.getCreatedDate());
        projectTask.setProjectTaskIdentifier(projectTaskTemp.getProjectTaskIdentifier());
        projectTaskRepository.save(projectTask);
        return projectTask;
   }
}
