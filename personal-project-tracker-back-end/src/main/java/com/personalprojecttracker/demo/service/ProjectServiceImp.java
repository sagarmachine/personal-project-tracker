package com.personalprojecttracker.demo.service;


import com.personalprojecttracker.demo.model.Project;
import com.personalprojecttracker.demo.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


@Service
@Transactional
public class ProjectServiceImp implements  IProjectService {

    @Autowired
    ProjectRepository projectRepository;

    @Override
    public Project saveOrUpdateProject(Project project) {
      project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
        projectRepository.save(project);
        return project;
    }

    @Override
    public Project getProjectById(String id) {

      Project project =projectRepository.findByProjectIdentifier( id.toUpperCase());
      if(project==null)
          throw new RuntimeException("not found");
      return project;
    }

    @Override
    public void deleteProjectById(String id) {
        Project project =projectRepository.findByProjectIdentifier( id.toUpperCase());
        if(project==null)
            throw new RuntimeException("not found");
        projectRepository.deleteByProjectIdentifier(id.toUpperCase());
    }
}
