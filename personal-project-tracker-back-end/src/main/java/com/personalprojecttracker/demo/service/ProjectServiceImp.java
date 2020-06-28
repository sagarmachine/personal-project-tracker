package com.personalprojecttracker.demo.service;


import com.personalprojecttracker.demo.exception.ProjectNotFoundException;
import com.personalprojecttracker.demo.model.Backlog;
import com.personalprojecttracker.demo.model.Project;
import com.personalprojecttracker.demo.repository.ProjectRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;


@Service
@Transactional
@Slf4j
public class ProjectServiceImp implements  IProjectService {

    @Autowired
    ProjectRepository projectRepository;

    @Override
    public Project saveOrUpdateProject(Project project) {

//        Project projectTemp =projectRepository.findByProjectIdentifier(project.getProjectIdentifier());
        project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());

        if(project.getId()!=0)
        {
            Optional<Project> projectTemp = projectRepository.findById(project.getId());
          if(projectTemp.isPresent())
            project.setBacklog((projectTemp.get().getBacklog()));
          else
              throw new ProjectNotFoundException("no project with  \""+project.getId()+"\" id found");
        }
        else{
            Backlog backlog= new Backlog();
            backlog.setProjectIdentifier(project.getProjectIdentifier());
            backlog.setProject(project);
            log.info("-->"+backlog.toString());
            project.setBacklog(backlog);
        }

        projectRepository.save(project);
        return project;
    }

    @Override
    public Project getProjectById(String id) {

      Project project =projectRepository.findByProjectIdentifier( id.toUpperCase());
      if(project==null)
          throw new ProjectNotFoundException("no project with  \""+id+"\" projectIdentifier found");
      return project;
    }

    @Override
    public void deleteProjectById(String id) {
        Project project =projectRepository.findByProjectIdentifier( id.toUpperCase());
        if(project==null)
            throw new ProjectNotFoundException("no project with  \""+id+"\" projectIdentifier found");
        projectRepository.deleteByProjectIdentifier(id.toUpperCase());
    }
}
