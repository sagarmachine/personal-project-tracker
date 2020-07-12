package com.personalprojecttracker.demo.controller;


import com.personalprojecttracker.demo.dto.ProjectRequestDto;
import com.personalprojecttracker.demo.model.Project;
import com.personalprojecttracker.demo.model.User;
import com.personalprojecttracker.demo.repository.ProjectRepository;
import com.personalprojecttracker.demo.repository.UserRepository;
import com.personalprojecttracker.demo.service.IBindingResultErrorService;
import com.personalprojecttracker.demo.service.IProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/v1/project")
@CrossOrigin(value = {"http://localhost:3000"},exposedHeaders = "Authentication")
public class ProjectController {

    @Autowired
    IProjectService projectService;

    @Autowired
    IBindingResultErrorService bindingResultErrorService;

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping("")
    public ResponseEntity<?> getAllProjects(Principal principal){
        User user =userRepository.findByEmail(principal.getName());
        return new ResponseEntity<>(projectRepository.findByUserEmailOrderByCreatedDateDesc(principal.getName()), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable String id, Principal principal){
     return new ResponseEntity<>( projectService.getProjectById(id,principal),HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> postNewProject(@Valid @RequestBody ProjectRequestDto project, BindingResult result, Principal principal){
        if(result.hasErrors())
             return bindingResultErrorService.getErrorResponse(result);

        return new ResponseEntity<>(projectService.saveOrUpdateProject(project,principal), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProjectById(@ PathVariable String id,Principal principal){
        projectService.deleteProjectById(id,principal);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProject(@Valid @RequestBody ProjectRequestDto project, BindingResult result,Principal principal){
        if(result.hasErrors())
            return bindingResultErrorService.getErrorResponse(result);
//return null;
        return new ResponseEntity<>(projectService.updateProject(project,principal), HttpStatus.ACCEPTED);
    }
}
