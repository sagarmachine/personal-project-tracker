package com.personalprojecttracker.demo.controller;

import com.personalprojecttracker.demo.dto.ProjectTaskRequestDto;
import com.personalprojecttracker.demo.model.ProjectTask;
import com.personalprojecttracker.demo.service.IBindingResultErrorService;
import com.personalprojecttracker.demo.service.IProjectTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("api/v1")
@CrossOrigin(value = {"http://localhost:3000"},exposedHeaders = "Authentication")
public class ProjectTaskController {

    @Autowired
    IBindingResultErrorService bindingResultErrorService;

    @Autowired
    IProjectTaskService projectTaskService;

  @PostMapping("/projecttask/{projectIdentifier}")
    ResponseEntity<?> addNewProjectTask(@PathVariable String  projectIdentifier,
                                         @Valid @RequestBody ProjectTaskRequestDto projectTask,
                                        BindingResult bindingResult, Principal principal){

      if(bindingResult.hasErrors())
          return bindingResultErrorService.getErrorResponse(bindingResult);
      //return null;
       return new ResponseEntity<>(projectTaskService.addProjectTask(projectIdentifier,projectTask,principal), HttpStatus.ACCEPTED);
  }

  @GetMapping("/project/{projectIdentifier}/projecttask")
   ResponseEntity<?> getAllProjectTaskByProjectIdentifier(@PathVariable String projectIdentifier,Principal principal){
    return new ResponseEntity<>(projectTaskService.getAllTaskByProjectIdentifier(projectIdentifier,principal),HttpStatus.OK);
  }

  @GetMapping("/projecttask/{projectTaskIdentifier}")
    ResponseEntity<ProjectTask> getProjectTaskByProjectTaskIdentifier(@PathVariable String projectTaskIdentifier,Principal principal){
       return new ResponseEntity<>(projectTaskService.getProjectByProjectTaskIdentifier(projectTaskIdentifier,principal),HttpStatus.OK);
  }

  @PutMapping("/projecttask/{projectTaskIdentifier}")
    ResponseEntity<?> updateProjectTaskByProjectTaskIdentifier(@PathVariable String projectTaskIdentifier,
                                                               @Valid @RequestBody ProjectTaskRequestDto projectTask,
                                                               BindingResult bindingResult,Principal principal){
      if(bindingResult.hasErrors())
          return bindingResultErrorService.getErrorResponse(bindingResult);

    //  return null;
     return new ResponseEntity<>(projectTaskService.updateProjectTaskByProjectTaskIdentifier(projectTaskIdentifier,projectTask,principal),HttpStatus.ACCEPTED);

  }

  @DeleteMapping("/projecttask/{projectTaskIdentifier}")
  @ResponseStatus(value = HttpStatus.NO_CONTENT)
    void deleteProjectTaskByProjectTaskIdentifier(@PathVariable String projectTaskIdentifier,Principal principal){
        projectTaskService.deleteProjectTaskByprojecttaskIdentifier(projectTaskIdentifier,principal);
  }

}
