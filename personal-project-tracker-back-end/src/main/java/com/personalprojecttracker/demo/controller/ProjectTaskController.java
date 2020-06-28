package com.personalprojecttracker.demo.controller;

import com.personalprojecttracker.demo.model.ProjectTask;
import com.personalprojecttracker.demo.service.IBindingResultErrorService;
import com.personalprojecttracker.demo.service.IProjectTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("api/v1")
@CrossOrigin("http://localhost:3000")
public class ProjectTaskController {

    @Autowired
    IBindingResultErrorService bindingResultErrorService;

    @Autowired
    IProjectTaskService projectTaskService;

  @PostMapping("/projecttask/{projectIdentifier}")
    ResponseEntity<?> addNewProjectTask(@PathVariable String  projectIdentifier, @Valid @RequestBody ProjectTask projectTask, BindingResult bindingResult){

      if(bindingResult.hasErrors())
          return bindingResultErrorService.getErrorResponse(bindingResult);
      return new ResponseEntity<>(projectTaskService.addProjectTask(projectIdentifier,projectTask), HttpStatus.ACCEPTED);
  }

  @GetMapping("/project/{projectIdentifier}/projecttask")
   ResponseEntity<?> getAllProjectTaskByProjectIdentifier(@PathVariable String projectIdentifier){
    return new ResponseEntity<>(projectTaskService.getAllTaskByProjectIdentifier(projectIdentifier),HttpStatus.OK);
  }

  @GetMapping("/projecttask/{projectTaskIdentifier}")
    ResponseEntity<ProjectTask> getProjectTaskByProjectTaskIdentifier(@PathVariable String projectTaskIdentifier){
       return new ResponseEntity<>(projectTaskService.getProjectByProjectTaskIdentifier(projectTaskIdentifier),HttpStatus.OK);
  }

  @PutMapping("/projecttask/{projectTaskIdentifier}")
    ResponseEntity<?> updateProjectTaskByProjectTaskIdentifier(@PathVariable String projectTaskIdentifier, @Valid @RequestBody ProjectTask projectTask, BindingResult bindingResult){
      if(bindingResult.hasErrors())
          return bindingResultErrorService.getErrorResponse(bindingResult);

      return new ResponseEntity<>(projectTaskService.updateProjectTaskByProjectTaskIdentifier(projectTaskIdentifier,projectTask),HttpStatus.ACCEPTED);

  }

  @DeleteMapping("/projecttask/{projectTaskIdentifier}")
  @ResponseStatus(value = HttpStatus.NO_CONTENT)
    void deleteProjectTaskByProjectTaskIdentifier(@PathVariable String projectTaskIdentifier){
        projectTaskService.deleteProjectTaskByprojecttaskIdentifier(projectTaskIdentifier);
  }

}
