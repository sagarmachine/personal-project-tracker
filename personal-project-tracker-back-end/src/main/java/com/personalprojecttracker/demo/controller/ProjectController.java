package com.personalprojecttracker.demo.controller;


import com.personalprojecttracker.demo.model.Project;
import com.personalprojecttracker.demo.repository.ProjectRepository;
import com.personalprojecttracker.demo.service.IBindingResultErrorService;
import com.personalprojecttracker.demo.service.IProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/v1/project")
public class ProjectController {

    @Autowired
    IProjectService projectService;

    @Autowired
    IBindingResultErrorService bindingResultErrorService;

    @Autowired
    ProjectRepository projectRepository;

    @GetMapping("")
    public ResponseEntity<ArrayList<Project>> getAllProjects(){
       return  new ResponseEntity(projectRepository.findAll(),HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable String id){
     return new ResponseEntity<>( projectService.getProjectById(id),HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> postNewProject(@Valid @RequestBody Project project, BindingResult result){
        if(result.hasErrors())
             return bindingResultErrorService.getErrorResponse(result);

        return new ResponseEntity<>(projectService.saveOrUpdateProject(project), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProjectById(@ PathVariable String id){
        projectService.deleteProjectById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProject(@Valid @RequestBody Project project, BindingResult result){
        if(result.hasErrors())
            return bindingResultErrorService.getErrorResponse(result);

        return new ResponseEntity<>(projectService.saveOrUpdateProject(project), HttpStatus.ACCEPTED);
    }
}
