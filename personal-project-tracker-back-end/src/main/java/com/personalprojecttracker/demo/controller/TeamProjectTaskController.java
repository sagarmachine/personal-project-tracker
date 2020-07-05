package com.personalprojecttracker.demo.controller;


import com.personalprojecttracker.demo.dto.TeamProjectTasKRequestDto;
import com.personalprojecttracker.demo.model.TeamProjectTask;
import com.personalprojecttracker.demo.service.IBindingResultErrorService;
import com.personalprojecttracker.demo.service.ITeamProjectTaskService;
import com.personalprojecttracker.demo.service.TeamProjectTaskServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/v1/teamproject")
public class TeamProjectTaskController {

    @Autowired
    ITeamProjectTaskService teamProjectTaskService;

    @Autowired
    IBindingResultErrorService bindingResultErrorService;

    @PostMapping("/{projectIdentifier}/mytask")
    public ResponseEntity<?> addMyTeamProjectTask(@Valid @RequestBody TeamProjectTasKRequestDto teamProjectTasKRequestDto,
                                                  BindingResult bindingResult, Principal principal,
                                                  @PathVariable String projectIdentifier) {
        if (bindingResult.hasErrors())
            return bindingResultErrorService.getErrorResponse(bindingResult);

        return new ResponseEntity<>(teamProjectTaskService.addMyTeamProjectTask(teamProjectTasKRequestDto, projectIdentifier, principal), HttpStatus.ACCEPTED);

    }

    @PostMapping("/task/{projectTaskIdetifier}")
    public ResponseEntity<?> addMeToExistingProjectTask(Principal principal,
                                                        @PathVariable String projectTaskIdetifier) {
        return new ResponseEntity<>(teamProjectTaskService.addMeToExistingTeamProjectTask(projectTaskIdetifier, principal), HttpStatus.ACCEPTED);
    }

    @PutMapping("/task/{projectTaskIdentifier}")
    public ResponseEntity<?> updateTeamProjectTask(@Valid @RequestBody TeamProjectTasKRequestDto teamProjectTasKRequestDto,
                                                  BindingResult bindingResult, Principal principal,
                                                  @PathVariable String projectTaskIdentifier) {
        if (bindingResult.hasErrors())
            return bindingResultErrorService.getErrorResponse(bindingResult);

        return new ResponseEntity<>(teamProjectTaskService.updateTeamProjectTask(teamProjectTasKRequestDto, projectTaskIdentifier, principal), HttpStatus.ACCEPTED);

    }

    @DeleteMapping("/task/{projectTaskIdetifier}")
    public ResponseEntity<?> removeMeFromExistingProjectTask(Principal principal,
                                                        @PathVariable String projectTaskIdetifier) {
        teamProjectTaskService.removeMeFromExistingTeamProjectTask(projectTaskIdetifier, principal);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}