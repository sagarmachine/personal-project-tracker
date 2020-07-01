package com.personalprojecttracker.demo.service;


import com.personalprojecttracker.demo.exception.ProjectNotFoundException;
import com.personalprojecttracker.demo.model.Backlog;
import com.personalprojecttracker.demo.model.Project;
import com.personalprojecttracker.demo.model.User;
import com.personalprojecttracker.demo.repository.ProjectRepository;
import com.personalprojecttracker.demo.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.Principal;
import java.util.Optional;


@Service
@Transactional
@Slf4j
public class ProjectServiceImp implements  IProjectService {

    @Autowired
    IUserService userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProjectRepository projectRepository;

    @Override
    public Project saveOrUpdateProject(Project project, Principal principal) {

//        Project projectTemp =projectRepository.findByProjectIdentifier(project.getProjectIdentifier());
        User user = userRepository.findByEmail(principal.getName());
        project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());

        if(project.getId()!=0)
        {
            Optional<Project> projectTemp = projectRepository.findById(project.getId());
          if(projectTemp.isPresent())
            project.setBacklog((projectTemp.get().getBacklog()));
          else
              throw new ProjectNotFoundException("no project with  \""+project.getId()+"\" id found");

          project.setUser(user);
          project.setCreatedDate(projectTemp.get().getCreatedDate());
          projectRepository.save(project);
            return project;
        }
        else{
            Backlog backlog= new Backlog();
            backlog.setProjectIdentifier(project.getProjectIdentifier());
            backlog.setProject(project);
            log.info("-->"+backlog.toString());
            project.setBacklog(backlog);
            user.addProject(project);
            project.setUser(user);

        }
       userRepository.save(user);
      //  projectRepository.save(project);
       //projectRepository.save(project);
        return project;
    }

    @Override
    public Project getProjectById(String id,Principal principal) {

      Project project =projectRepository.findByProjectIdentifier( id.toUpperCase());
      if(project==null || !project.getUser().getEmail().equals(principal.getName()))
          throw new ProjectNotFoundException("no project with  \""+id+"\" projectIdentifier found");
      return project;
    }

    @Override
    public void deleteProjectById(String id,Principal principal) {
        Project project =projectRepository.findByProjectIdentifier( id.toUpperCase());
        if(project==null || !project.getUser().getEmail().equals(principal.getName()))
            throw new ProjectNotFoundException("no project with  \""+id+"\" projectIdentifier found");

        User user = userRepository.findByEmail(principal.getName());

        user.getProjects().remove(project);
        userRepository.save(user);
        projectRepository.deleteByProjectIdentifier(id.toUpperCase());
    }
}
