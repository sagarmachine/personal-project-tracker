package com.personalprojecttracker.demo.controller;

import com.personalprojecttracker.demo.dto.TeamProjectRequestDto;
import com.personalprojecttracker.demo.service.IBindingResultErrorService;
import com.personalprojecttracker.demo.service.ITeamProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/v1/teamproject")
public class TeamProjectController {

    @Autowired
    ITeamProjectService teamProjectService;

    @Autowired
    IBindingResultErrorService bindingResultErrorService;

    @PostMapping("/")
    public ResponseEntity<?>  addTeamProject(@Valid @RequestBody TeamProjectRequestDto teamProjectRequestDto,
                                             BindingResult bindingResult,Principal principal){

        if(bindingResult.hasErrors())
            bindingResultErrorService.getErrorResponse(bindingResult);
        return new ResponseEntity<>(teamProjectService.addTeamProject(teamProjectRequestDto,principal), HttpStatus.ACCEPTED);

    }

    @GetMapping("/")
    public ResponseEntity<?> getTeamProjects(Principal principal){
        return new ResponseEntity<>(teamProjectService.getAllTeamProject(principal),HttpStatus.OK);
    }

    @GetMapping("/{projectIdentifier}")
    public ResponseEntity<?> getTeamProject(@PathVariable String projectIdentifier,Principal principal){
        return new ResponseEntity<>(teamProjectService.getTeamProject(projectIdentifier,principal),HttpStatus.OK);
    }

    @DeleteMapping("/{projectIdentifier}")
    public ResponseEntity<?> deleteTeamProject(@PathVariable String projectIdentifier,Principal principal){

        teamProjectService.deleteTeamProject(projectIdentifier,principal);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

}
